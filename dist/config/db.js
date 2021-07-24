"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    development: {
        database: {
            host: "db-development.ch6g3obplhnc.ap-southeast-1.rds.amazonaws.com",
            port: "3306",
            db: "db-development",
            username: "admin",
            password: "abcde12345-"
        }
    },
    production: {
        database: {
            host: "db-development.ch6g3obplhnc.ap-southeast-1.rds.amazonaws.com",
            port: "3306",
            db: "db-development",
            username: "admin",
            password: "abcde12345-"
        }
    }
};
exports.default = config;
