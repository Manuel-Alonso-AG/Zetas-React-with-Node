import type { LogLevel, LogEntry, LoggerOptions } from "./types";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Colores ANSI completos
const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  // Texto
  white: "\x1b[97m",
  gray: "\x1b[90m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  // Fondo para badges
  bgDebug: "\x1b[100m", // gris oscuro
  bgInfo: "\x1b[44m", // azul
  bgWarn: "\x1b[43m", // amarillo
  bgError: "\x1b[41m", // rojo
  bgSuccess: "\x1b[42m", // verde
};

const BADGE: Record<LogLevel, string> = {
  debug: `${C.bgDebug}${C.white} DEBUG ${C.reset}`,
  info: `${C.bgInfo}${C.white}  INFO  ${C.reset}`,
  warn: `${C.bgWarn}\x1b[30m  WARN  ${C.reset}`,
  error: `${C.bgError}${C.white} ERROR ${C.reset}`,
};

const METHOD_COLOR: Record<string, string> = {
  GET: C.cyan,
  POST: C.green,
  PUT: C.yellow,
  PATCH: C.yellow,
  DELETE: C.red,
};

const STATUS_COLOR = (code: number) => {
  if (code >= 500) return C.red;
  if (code >= 400) return C.yellow;
  if (code >= 300) return C.cyan;
  return C.green;
};

export class Logger {
  private context: string;
  private minLevel: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.context = options.context ?? "App";
    this.minLevel =
      options.minLevel ?? (process.env["LOG_LEVEL"] as LogLevel) ?? "debug";
  }

  child(context: string): Logger {
    return new Logger({ context, minLevel: this.minLevel });
  }

  debug(message: string, data?: unknown) {
    this.write("debug", message, data);
  }
  info(message: string, data?: unknown) {
    this.write("info", message, data);
  }
  warn(message: string, data?: unknown) {
    this.write("warn", message, data);
  }

  error(message: string, error?: unknown) {
    const errorData =
      error instanceof Error
        ? {
            message: error.message,
            stack: error.stack?.split("\n").slice(0, 3).join(" → "),
          }
        : error;
    this.write("error", message, errorData);
  }

  // Método especial para el resultado de requests HTTP
  http(method: string, path: string, statusCode: number, duration: number) {
    const mColor = METHOD_COLOR[method] ?? C.white;
    const sColor = STATUS_COLOR(statusCode);
    const level: LogLevel =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    const message =
      `${mColor}${method.padEnd(6)}${C.reset}` +
      `${C.dim}${path}${C.reset} ` +
      `${sColor}${statusCode}${C.reset} ` +
      `${C.dim}${duration}ms${C.reset}`;

    this.write(level, message, undefined, true); // skipFormat = true — ya viene formateado
  }

  private write(
    level: LogLevel,
    message: string,
    data?: unknown,
    preFormatted = false,
  ) {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.minLevel]) return;

    if (process.env["NODE_ENV"] === "production") {
      const entry: LogEntry = {
        level,
        message,
        data,
        timestamp: new Date().toISOString(),
        context: this.context,
      };
      const stream = level === "error" ? process.stderr : process.stdout; // process.stderr (Es standar error, exclusivo de errores) process.stdout (Es como conso.log);
      stream.write(JSON.stringify(entry) + "\n");
      return;
    }

    this.writePretty(level, message, data, preFormatted);
  }

  private writePretty(
    level: LogLevel,
    message: string,
    data?: unknown,
    preFormatted = false,
  ) {
    // Timestamp: solo la hora HH:MM:SS.mmm
    const now = new Date();
    const time =
      `${C.dim}${String(now.getHours()).padStart(2, "0")}:` +
      `${String(now.getMinutes()).padStart(2, "0")}:` +
      `${String(now.getSeconds()).padStart(2, "0")}.` +
      `${String(now.getMilliseconds()).padStart(3, "0")}${C.reset}`;

    const badge = BADGE[level];
    const ctx = `${C.dim}[${C.reset}${C.gray}${this.context}${C.reset}${C.dim}]${C.reset}`;
    const msg = preFormatted ? message : `${C.white}${message}${C.reset}`;

    const stream = level === "error" ? process.stderr : process.stdout;
    stream.write(`${time} ${badge} ${ctx} ${msg}\n`);

    // Datos adicionales — indentados y coloreados
    if (data !== undefined) {
      const lines = JSON.stringify(data, null, 2).split("\n");
      const formatted = lines
        .map((line) => {
          // Colorea claves y valores del JSON
          return (
            "          " +
            line
              .replace(/"([^"]+)":/g, `${C.blue}"$1"${C.reset}:`)
              .replace(/: "([^"]+)"/g, `: ${C.green}"$1"${C.reset}`)
              .replace(/: (\d+)/g, `: ${C.yellow}$1${C.reset}`)
              .replace(/: (true|false)/g, `: ${C.cyan}$1${C.reset}`)
          );
        })
        .join("\n");

      stream.write(`${C.dim}${formatted}${C.reset}\n`);
    }
  }
}
