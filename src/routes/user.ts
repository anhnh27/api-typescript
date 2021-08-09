import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../middlewares/checkJwt";

const userRoute: Router = Router();
userRoute.get("/users", [checkJwt], UserController.search, UserController.getByEmail);
userRoute.post("/users", UserController.register);
userRoute.put("/users/:id", [checkJwt], UserController.updateProfile);
userRoute.delete("/users/:id", [checkJwt], UserController.deleteAccount);

export default userRoute;