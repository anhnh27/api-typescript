import { Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: any) => {
    console.log('req.session.cookie', req.session.cookie)
    if (req.session && req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
}