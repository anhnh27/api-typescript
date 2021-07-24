import { Request, Response } from "express";
import * as TasksService from "../services/tasks";

const getTasks = async (req: Request, res: Response) => {
    const { ok, status, message, data } = await TasksService.getTasks();
    if (ok && data) {
        return res.status(status).json(data);
    } else {
        return res.status(status).json({ message });
    }
}

const createTasks = async (req: Request, res: Response) => {
    const { ok, status, message, data } = await TasksService.createTask(req.body);
    if (ok && data) {
        return res.status(status).json(data);
    } else {
        return res.status(status).json({ message });
    }
}

const editTask = async (req: Request, res: Response) => {
    const { ok, status, message, data } = await TasksService.editTask(req.body);
    if (ok && data) {
        return res.status(status).json(data);
    } else {
        return res.status(status).json({ message });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const { ok, status, message, data } = await TasksService.deleteTask(req.params.id);
    if (ok && data) {
        return res.status(status).json(data);
    } else {
        return res.status(status).json({ message });
    }
}

const searchTasks = async (req: Request, res: Response, next: any) => {
    if (req.query.keyword) {
        const { ok, status, message, data } = await TasksService.search(req.query.keyword.toString());
        if (ok && data) {
            return res.status(status).json(data);
        } else {
            return res.status(status).json({ message });
        }
    } else {
        next()
    };
}

export {
    getTasks,
    createTasks,
    editTask,
    deleteTask,
    searchTasks
}