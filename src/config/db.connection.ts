import mysql from "mysql";

const config = {
    connectionLimit: 100,
    host: "db-development.ch6g3obplhnc.ap-southeast-1.rds.amazonaws.com",
    database: "new_schema",
    user: "admin",
    password: "abcde12345-",
};

const pool = mysql.createPool(config);

const query = async (query: string, params?: any) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            reject(err);
        }
        connection.query(query, params, (error: any, result: any, fields: any) => {
            if (error) {
                reject(error);
            }
            resolve(result);
            connection.release();
        });
    });
});

export {
    query
};