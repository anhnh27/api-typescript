import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config/twt';

export const authorization = (req: Request, res: Response, next: any) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.sendStatus(403);
    const bearer = authorization?.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, result) => {
        if (err) { res.sendStatus(403) }
        else { next() }
    });
}