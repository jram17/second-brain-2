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
import { random } from './lib/utils';
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
    }).populate("userId", "username");
    res.status(200).json({
        content
    })
})

app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    await Content.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added successfully "
    })
});

app.delete('/api/v1/:contentId', userMiddleware, async (req, res) => {
    const contentId = req.params.contentId;
    console.log(" deleting contentId", contentId);
    const deletedContent = await Content.findByIdAndDelete(contentId);
    console.log("this is the deleted content: ", deletedContent);

    res.status(200).json({
        message: "delete sucessfull"
    })
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