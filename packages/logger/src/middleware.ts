import type { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";

const httpLogger = new Logger({ context: "HTTP" });

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // Log de entrada — solo en debug
  httpLogger.debug(
    `\x1b[2m→\x1b[0m ${req.method} ${req.path}`,
    Object.keys(req.query).length > 0 || req.ip
      ? {
          ...(Object.keys(req.query).length > 0 && { query: req.query }),
          ip: req.ip,
        }
      : undefined,
  );

  res.on("finish", () => {
    httpLogger.http(req.method, req.path, res.statusCode, Date.now() - start);
  });

  next();
}
