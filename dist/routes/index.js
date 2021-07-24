"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middlewares/auth");
var auth_2 = __importDefault(require("./auth"));
var tasks_1 = __importDefault(require("./tasks"));
var dashboard_1 = __importDefault(require("./dashboard"));
var routes = express_1.default.Router();
routes.use("/", auth_2.default);
routes.use("/", auth_1.authorization, tasks_1.default);
routes.use("/", auth_1.authorization, dashboard_1.default);
exports.default = routes;
