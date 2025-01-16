import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ACCESS_PASSWORD,  } from "../config/configJWT";
import { CustomRequest } from "../types/req-types";

interface verifyuserMiddlewareTypes {
    req: CustomRequest,
    res: Response,
    next: NextFunction,
}

export const verifyuser = ({ req, res, next }: verifyuserMiddlewareTypes) => {
    const accesstoken = req.headers.authorization?.split(" ")[1];

    if (!accesstoken) {
        res.status(401).json({ valid: false, message: "no access token present" });
    } else {
        try {
            const decoded = jwt.verify(accesstoken, JWT_ACCESS_PASSWORD);
            if (decoded) {
                req.userId = (decoded as JwtPayload).id;
                next();
            } else {
                res.status(403).json({ valid: false, message: "Invalid access token" });
            }
        } catch (error) {
            throw new Error(error);
        }

    }
}


