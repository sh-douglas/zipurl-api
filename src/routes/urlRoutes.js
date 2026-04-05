import express from "express";

import UrlController from "../controllers/UrlController.js";

import AuthMiddle from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/shorten", AuthMiddle, UrlController.create);
router.get("/", AuthMiddle, UrlController.findAll);
router.get("/:id", AuthMiddle, UrlController.findById);
router.put("/:id", AuthMiddle, UrlController.update);
router.delete("/:id", AuthMiddle, UrlController.deleteOne);

export default router;
