import { Request, Response } from "express";

export const authorization = (req: Request, res: Response, next: any) => {
    if (req.session && req.session.authenticated)
        return next();
    else
        return res.sendStatus(401);
}