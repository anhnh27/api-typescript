import { Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: any) => {
    console.log('SESSION: ', req.session)
    if (req.session && req.session.cookie)
        return next();
    else
        return res.sendStatus(401);
}