import express from "express";
import {
  handleLoginPost,
  handleCreatePost,
  handleForgotPassword,
} from "../../controllers/Login.js";

const LoginRouter = express.Router();

LoginRouter.post("/", handleLoginPost);

LoginRouter.post("/create", handleCreatePost);

LoginRouter.post("/forgotPassword", handleForgotPassword);

export default LoginRouter;
