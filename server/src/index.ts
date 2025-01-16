import express from 'express';
import { connectDB } from './config/configDB';
import { Content } from './model/content-schema';
import { verifyuser } from './middleware/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { User } from './model/user-schema';
import { JWT_ACCESS_PASSWORD, JWT_REFRESH_PASSWORD } from './config/configJWT';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Link } from './model/link-schema';
import { random } from './lib/utils';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization']
}));


app.route('/api/v1/signup')
    .post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            await User.create({
                username: username,
                password: password
            })

            res.status(200).json({
                message: "User signed up"
            })
        } catch (e) {
            res.status(411).json({
                message: "User already exists"
            })
        }
    });

app.route('/api/v1/signin')
    .post(async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const existinguser = await User.findOne({ username, password });
        if (existinguser) {
            const accessToken = jwt.sign({ id: existinguser._id }, JWT_ACCESS_PASSWORD, { expiresIn: '1m' });
            const refreshToken = jwt.sign({ id: existinguser._id }, JWT_REFRESH_PASSWORD, { expiresIn: '5m' });
            // res.cookie('accessToken', accessToken, { maxAge: 1 * 60 * 1000 })


            res.cookie('refreshToken', refreshToken,
                { maxAge: 5 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' })

            res.json({
                message: "User authenticated",
                token: accessToken,
                refresh: refreshToken,
            });
        } else {
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    });

app.post('api/v1/refresh',async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        res.status(401).json({valid:false,message:"refresh Token expired"});
    }else{
        try {
            const decoded=jwt.verify(refreshToken,JWT_REFRESH_PASSWORD);
            if(decoded){
                const accessToken=jwt.sign({id:(decoded as JwtPayload).id},JWT_ACCESS_PASSWORD,{expiresIn:'1m'});
                res.status(201).json({accessToken:accessToken,message:"new access token generated"});
            }else{
                res.status(403).json({valid:false,message:"Invalid refresh token"});
            }
        } catch (error) {
            throw new Error(error);
        }
    }
})

app.route('/api/v1/content')
    .get(verifyuser, async (req, res) => {
        const userId = req.userId;
        const content = await Content.find({
            userId: userId
        }).populate("userId", "username");
        res.status(200).json({
            content
        })
    })
    .post(verifyuser, async (req, res) => {
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

app.post('/api/v1/verifyJWT', verifyuser, async (req, res) => {
    res.status(401).json({ valid: true, message: "user authorized" })
});

app.delete('/api/v1/:contentId', verifyuser, async (req, res) => {
    const contentId = req.params.contentId;
    console.log(" deleting contentId", contentId);
    const deletedContent = await Content.findByIdAndDelete(contentId);
    console.log("this is the deleted content: ", deletedContent);

    res.status(200).json({
        message: "delete sucessfull"
    })
});

app.post('/api/v1/brain/share', verifyuser, async (req, res) => {
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
        await Link.deleteOne({

            userId: req.userId
        });

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
    // userId
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

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);

});