import express from "express";
import { authorization } from "../middlewares/auth";
import authRoute from "./auth";
import tasksRoute from "./tasks";
import dashboardRoute from "./dashboard";

const routes = express.Router();

routes.use("/", authRoute);
routes.use("/", authorization, tasksRoute);
routes.use("/", authorization, dashboardRoute);

export default routes;