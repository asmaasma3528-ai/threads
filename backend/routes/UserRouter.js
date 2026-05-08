import express from "express";
import {Login} from "../controllers/UsersController.js";
import {Register} from "../controllers/RegisterController.js";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);

export default userRouter;