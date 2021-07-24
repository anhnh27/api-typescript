import express, { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const authRoute: Router = express.Router();

authRoute.post("/login", AuthController.login);
authRoute.get("/logout", AuthController.logout);

export default authRoute;