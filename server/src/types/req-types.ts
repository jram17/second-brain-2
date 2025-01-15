import { Request } from "express";
type userRequest= {
    userId?:string;
}

export type CustomRequest = Request & userRequest;
