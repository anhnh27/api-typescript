import { query } from '../config/db.connection';

const getDashboardData = async () => {
    try {
        let totalTasks = await query('SELECT COUNT(id) as count FROM tasks') as Array<any>;
        let completedTasks = await query('SELECT COUNT(id) as count FROM tasks WHERE done=true') as Array<any>;
        let latestTasks = await query('SELECT id, name, done FROM tasks ORDER BY created_at DESC LIMIT 3');
        return {
            totalTasks: totalTasks[0]?.count,
            completedTasks: completedTasks[0].count,
            latestTasks
        };
    } catch (ex) {
        return ex;
    }
};

export {
    getDashboardData
}
