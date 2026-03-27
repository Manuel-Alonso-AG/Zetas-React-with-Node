process.loadEnvFile();
import express from "express";
import { validateServerEnv } from "@zetas/config";
import { Logger, requestLogger } from "@zetas/logger";

const env = validateServerEnv();
const app = express();
const logger = new Logger({ context: "@Zetas/Server" });

app.use(express.json());
app.use(requestLogger);

app.use("/api/health", (_req, res) => {
  logger.info("Chequeo solicitado");
  res.json({ success: true, message: "Servidor corriendo" });
});

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error("Error no manejado", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  },
);

app.listen(env.port, () => {
  logger.info(`Servidor iniciado`, {
    port: env.port,
    env: process.env["NODE_ENV"] ?? "development",
  });
});
