import { query } from '../config/db.connection';

export interface Task {
    id: number;
    name: string;
    done: boolean;
}

export interface AddTask {
    id?: number,
    name: string;
    done: boolean;
}

const getAllTasks = async () => {
    try {
        const results = await query('SELECT id, name, done FROM tasks');
        return results;
    } catch (ex) {
        return ex;
    }
};

const create = async (task: AddTask) => {
    try {
        const results = await query('INSERT INTO tasks SET ?', task);
        return results;
    } catch (ex) {
        return ex;
    }
};

const edit = async (task: Task) => {
    try {
        const results = await query('UPDATE tasks SET ? WHERE id=?', [task, task.id]);
        return results;
    } catch (ex) {
        return ex;
    }
};

const remove = async (taskId: string) => {
    try {
        const results = await query('DELETE FROM tasks WHERE id=?', [taskId]);
        return results;
    } catch (ex) {
        return ex;
    }
};

const searchTasks = async (keyword: string) => {
    try {
        const results = await query(`SELECT id, name, done FROM tasks WHERE name LIKE '%${keyword}%'`);
        return results;
    } catch (ex) {
        return ex;
    }
}

export {
    getAllTasks,
    create,
    edit,
    remove,
    searchTasks,
}