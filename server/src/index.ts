
// @ts-nocheck

import express from 'express';
import cors from 'cors';
import { userMiddleware } from './middleware/auth';
import { User } from './model/user-schema';
import { Content } from './model/content-schema';
import { Link } from './model/link-schema';
import { Tags } from './model/tags-schema';
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser = require("cookie-parser");
import { connectDB } from './config/configDB';
import { JWT_ACCESS_PASSWORD, JWT_REFRESH_PASSWORD } from './config/configJWT';
import { fetchMetadata, getMainUrl, random } from './lib/utils';
// import mql, { HTTPResponseRaw } from '@microlink/mql';
import { Scrapped } from './model/scrapped-content-schema';

import dotenv from "dotenv";
dotenv.config()
import { findBestMatch, generateSummary } from './ai-search/ai-search';


const port = 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization']
}));
app.use(cookieParser());




app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(411).json({ message: 'User already exists' });
        }
        await User.create({
            username: username,
            password: password
        });
        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(411).json({ message: error });
    }
});

app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({ username: username, password: password });
    if (existingUser) {
        const accessToken = jwt.sign({ id: existingUser._id }, JWT_ACCESS_PASSWORD, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: existingUser._id }, JWT_REFRESH_PASSWORD, { expiresIn: '5m' });
        res.cookie('refreshToken', refreshToken, { maxAge: 5 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({
            message: 'User authenticated',
            token: accessToken,
            refresh: refreshToken
        });
    } else {
        res.status(403).json({ message: 'Incorrect credentials' });
    }
});

app.get('/api/v1/checkAuth', userMiddleware, (req, res) => {
    res.status(200).json({ valid: true, message: "user authenticated" });
});

app.get('/api/v1/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ valid: false, message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_PASSWORD) as JwtPayload;
        const accessToken = jwt.sign(
            {
                id: decoded.id
            },
            JWT_ACCESS_PASSWORD,
            { expiresIn: "1m" });

        res.status(201).json({ accessToken: accessToken, message: "Access token generated" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ valid: false, message: "Refresh token expired" });
        } else {
            res.status(403).json({ valid: false, message: "Invalid refresh token" });
        }
    }
})



app.get('/api/v1/content', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await Content.find({
        userId: userId
    }).populate("userId", "username")
        .populate({
            path: "scrapped",
            model: "Scrapped",
            select: "author title publisher imageUrl originUrl url description logoUrl"
        });
    res.status(200).json({
        content
    })
})



app.post('/api/v1/content', userMiddleware, async (req, res) => {
    // const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    const text = req.body.text;
    try {
        const newContent = await Content.create({
            link,
            type,
            text,
            userId: req.userId,
            tags: []
        });
        if (link) {
            const contentId = newContent._id;
            const metadata = await fetchMetadata(link);
            const baseUrl = getMainUrl(link);


            await Scrapped.create({
                contentId,
                author: metadata.author,
                title: metadata.title,
                publisher: metadata.publisher,
                imageUrl: metadata.image.url,
                originUrl: baseUrl,
                url: link,
                description: metadata.description,
                logoUrl: metadata.logo.url,
            });
        }
        res.json({
            flag: true,
            message: "Content added successfully",
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process content' });
    }
});

app.delete('/api/v1/:contentId', userMiddleware, async (req, res) => {
    const contentId = req.params.contentId;
    console.log(" deleting contentId", contentId);
    const deletedContent = await Content.findByIdAndDelete(contentId);
    console.log("this is the deleted content: ", deletedContent);

    res.status(200).json({
        valid: true,
        message: "delete sucessfull"
    })
});


// space for ai search

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/v1/query", userMiddleware, async (req, res): Promise<void> => {
    try {
   
        const query = req.body.query;
        if (!query) {
            res.status(400).json({ message: "Query is required" });
            return;
        }
        const contentList = await Content.find({ userId: req.userId }).populate({
            path: "scrapped",
            model: "Scrapped",
            select: "title description url author publisher imageUrl logoUrl contentId",
        });

        if (contentList.length === 0) {
            console.log("No content");
            res.status(404).json({ message: "No content found" });
            return;
        }
        const validContentList = contentList.filter(content => content.scrapped);

        if (validContentList.length === 0) {
            res.status(404).json({ message: "No relevant content with scrapped data found" });
            return;
        }

        
        const contentTexts = validContentList.map(content => 
            `${content.scrapped?.title || "Untitled"} - ${content.scrapped?.description || "No description"}`
        );

        const prompt = `
            Given the following pieces of content, find the one that best matches the user query:
            Query: "${query}"
            
            Content:
            ${contentTexts.map((text, index) => `(${index + 1}) ${text}`).join("\n")}

            Return ONLY the number of the most relevant content (e.g., "1", "2", etc.).
        `;
        
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
        });

        const matchText = response.choices[0]?.message?.content?.trim();
        const bestMatchIndex = parseInt(matchText, 10) - 1;
        if (isNaN(bestMatchIndex) || bestMatchIndex < 0 || bestMatchIndex >= validContentList.length) {
            res.status(404).json({ message: "No relevant content found" });
            return;
        }

        const bestMatch = validContentList[bestMatchIndex];

        const summaryPrompt = `
            Summarize the following content in relation to the user query: "${query}"
            
            Content: "${bestMatch.scrapped.title || "Untitled"} - ${bestMatch.scrapped.description || "No description"}"

            Provide a concise response (if the summary is short,then ellaborate ).
        `;

        const summaryResponse = await groq.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: summaryPrompt }],
        });

        const summary = summaryResponse.choices[0]?.message?.content?.trim() || "No summary available.";

        res.json({
            status: true,
            bestMatch: {
                contendId:bestMatch.scrapped.contendId || "Unkown",
                title: bestMatch.scrapped.title || "Untitled",
                description: bestMatch.scrapped.description || "No description",
                url: bestMatch.scrapped.url || "",
                author: bestMatch.scrapped.author || "Unknown",
                publisher: bestMatch.scrapped.publisher || "Unknown",
                imageUrl: bestMatch.scrapped.imageUrl || "",
                logoUrl: bestMatch.scrapped.logoUrl || "",

            },
            summary,
        });

    } catch (error) {
        console.error("AI Search Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


















app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await Link.findOne({
            userId: req.userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await Link.create({

            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })
    } else {
        await Link.deleteOne({ userId: req.userId });
        res.json({
            message: "Removed link"
        })
    }
});


app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await Link.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    const content = await Content.find({
        userId: link.userId
    })
    console.log(link);
    const user = await User.findOne({
        _id: link.userId
    })
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })

})

connectDB();
app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})