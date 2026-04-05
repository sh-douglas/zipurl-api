import express from "express";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";
import AuthMiddle from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/signup", UserController.register);
router.post("/signin", AuthController.login);
router.get("/me", AuthMiddle, UserController.show);

export default router;
