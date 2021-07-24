import express, { Router } from "express";
import * as TasksController from "../controllers/tasks.controller";

const tasksRoute: Router = express.Router();

tasksRoute.get("/tasks", TasksController.searchTasks, TasksController.getTasks);
tasksRoute.post("/tasks", TasksController.createTasks);
tasksRoute.put("/tasks/:id", TasksController.editTask);
tasksRoute.delete("/tasks/:id", TasksController.deleteTask);

export default tasksRoute;