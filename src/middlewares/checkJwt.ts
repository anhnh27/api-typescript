import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../common/constants";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }
    const bearerToken = authorization.split(" ")[1];
    let jwtPayload: any;

    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(bearerToken, JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, JWT_SECRET, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};