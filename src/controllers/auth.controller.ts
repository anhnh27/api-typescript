import { Request, Response } from "express";
import * as AuthService from "../services/auth";
import jwt from 'jsonwebtoken';
import SECRET_KEY from '../config/twt';

declare module 'express-session' {
    export interface SessionData {
        authenticated: boolean,
        email: string
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    const { ok, status, message, data } = await AuthService.login(email, password);
    if (ok && data) {
        const { firstName, lastName, profilePic } = data;
        jwt.sign({
            username: `${firstName} ${lastName} ${new Date()}`,
        },
            SECRET_KEY,
            { expiresIn: '1h' },
            (err: any, token: any) => {
                return res.status(status).send({
                    token: {
                        name: `${firstName} ${lastName}`,
                        token,
                    },
                    image: profilePic,
                })
            });
    } else {
        return res.status(status).json({ message });
    }
}

const logout = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.sendStatus(403);
    const bearer = authorization?.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, result) => {
        if (err) { res.sendStatus(403) }
        else {
            req.session.destroy(() => { });
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: 'Logout successfully.' });
        }
    });
}

export {
    login,
    logout
}