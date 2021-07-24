import express, { Router, Request, Response } from "express";
import * as DashboardController from "../controllers/dashboard.controller";

const dashboardRoute: Router = express.Router();

dashboardRoute.get("/dashboard", DashboardController.getDashboardData);

export default dashboardRoute;