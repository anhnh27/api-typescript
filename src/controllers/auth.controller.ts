import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import * as AuthService from "../services/auth";

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
        let tokenId = uuid();
        const responseObj = {
            token: {
                name: `${firstName} ${lastName}`,
                token: tokenId
            },
            image: profilePic,
        }
        req.session.authenticated = true;
        return res.status(status).json(responseObj);
    } else {
        return res.status(status).json({ message });
    }
}

const logout = async (req: Request, res: Response) => {
    const { ok, status, message } = await AuthService.logout();
    if (ok) {
        req.session.destroy(() => { });
        res.clearCookie('connect.sid');
        return res.status(status).json({ message });
    } else {
        return res.status(status).json({ message });
    }
}

export {
    login,
    logout
}