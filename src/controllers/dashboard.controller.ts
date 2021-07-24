import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import * as DashboardService from "../services/dashboard";

const getDashboardData = async (req: Request, res: Response) => {
    const { ok, status, message, data } = await DashboardService.getDashobardData();
    if (ok && data) {
        return res.status(status).json(data);
    } else {
        return res.status(status).json({ message });
    }
}

export {
    getDashboardData
}