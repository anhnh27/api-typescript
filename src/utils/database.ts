import mysql, { MysqlError, FieldInfo } from "mysql";
import { dbConfig } from "../config/database";

const pool = mysql.createPool(dbConfig);
const queryExecutor: Function = async (query: string, params?: any) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            reject(err);
        }
        connection.query(query, params, (err: MysqlError | null, results?: any, _fields?: FieldInfo[]) => {
            if (err) {
                reject(err);
            }
            resolve(results);
            connection.release();
        });
    });
});

export {
    queryExecutor
};