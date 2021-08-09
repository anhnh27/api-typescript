import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";

const routes: Router = Router();
routes.use("/", authRoute);
routes.use("/", userRoute);

export default routes;