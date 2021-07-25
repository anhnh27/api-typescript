import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config/twt';

export const authorization = (req: Request, res: Response, next: any) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }
    const bearerToken = authorization?.split(" ")[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, result) => {
        if (err) {
            return res.sendStatus(403);
        }
        else {
            return next();
        }
    });
}