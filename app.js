import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { sequelize } from "./src/models/index.js";
import urlRouter from "./src/routes/urlRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import UrlController from "./src/controllers/UrlController.js";
import globalErrorHandler from "./src/middlewares/GlobalErrorMiddleware.js";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/urls", urlRouter);
app.get("/:shortCode", UrlController.handleRedirect);

app.use(globalErrorHandler);

try {
  await sequelize.authenticate();
  app.listen(port);
} catch (error) {
  throw error;
}
