import { ZodError } from "zod";
import AppError from "../errors/AppError.js";

function globalErrorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  } else if (error instanceof ZodError) {
    res.status(400).json({ error: "Campos inválidos." });
    return;
  }
  res.status(500).json({
    error: "Ocorreu um erro com sua solicitação, tente novamente.",
  });
}

export default globalErrorHandler;
