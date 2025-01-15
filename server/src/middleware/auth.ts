import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ACCESS_PASSWORD, JWT_REFRESH_PASSWORD } from "../config/configJWT";
import { CustomRequest } from "../types/req-types";

interface verifyuserMiddlewareTypes{
    req: CustomRequest,
    res: Response,
    next: NextFunction,
}

export const verifyuser=({req,res,next}:verifyuserMiddlewareTypes)=>{
    const accesstoken=req.cookies.accesstoken;
    if(!accesstoken){
        renewToken({req,res,next});
    }else{
        try{
            const decoded= jwt.verify(accesstoken as string,JWT_ACCESS_PASSWORD);
            if(decoded){
                req.userId=(decoded as JwtPayload).id;
                next()
            }
        }catch(error){
            if(error instanceof jwt.TokenExpiredError) {
                renewToken({req, res, next});
            } else {
                res.status(403).json({valid:false, message: "Invalid token!!" })
            }
        }
    }
}

const renewToken = ({req,res,next}:verifyuserMiddlewareTypes)=>{
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        res.status(401).json({ valid: false, message: "No Refresh token present" });
        // next()
    } else {
        try {
            const decoded = jwt.verify(refreshtoken, JWT_REFRESH_PASSWORD);
            if (decoded) {
                const accessToken = jwt.sign(
                    { id: (decoded as JwtPayload).id },
                    JWT_ACCESS_PASSWORD,
                    { expiresIn: "1m" }
                );
                res.cookie('accessToken', accessToken, { maxAge: 1 * 60 * 1000 });
                req.userId = (decoded as JwtPayload).id
                next();
            }
        }
        catch (error) {
            if (error  instanceof jwt.TokenExpiredError) {
                res.status(401).json({ valid: false, message: "Refresh token expired or not there" });
            } else {
                res.status(403).json({ message: "Invalid refresh token" });
            }

        }

    }
}