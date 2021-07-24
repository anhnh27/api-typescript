"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tasksRoute = express_1.default.Router();
tasksRoute.get("/tasks", function (req, res) {
    return res.status(200).json({ data: [{ title: "Task 1", selected: false, done: true }, { title: "Task 2", selected: true, done: true }] });
});
exports.default = tasksRoute;
