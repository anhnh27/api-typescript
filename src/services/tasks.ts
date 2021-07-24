import { AddTask, Task, getAllTasks, create, edit, remove, searchTasks } from '../models/task';

export const getTasks = async () => {
    let res;
    try {
        let data = await getAllTasks();
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}

export const search = async (keyword: string) => {
    let res;
    try {
        let data = await searchTasks(keyword);
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}

export const createTask = async (task: AddTask) => {
    let res;
    try {
        let data = await create(task);
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}

export const editTask = async (task: Task) => {
    let res;
    try {
        let data = await edit(task);
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}

export const deleteTask = async (id: string) => {
    let res;
    try {
        let data = await remove(id);
        res = {
            ok: true,
            status: 200,
            message: "OK",
            data
        }
    } catch (ex) {
        res = {
            ok: false,
            status: 200,
            message: ex.message,
            data: null
        }
    }
    return res;
}