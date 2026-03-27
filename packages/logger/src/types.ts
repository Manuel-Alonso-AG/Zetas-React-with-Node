/** Niveles de log: Debug, informacion, peligro, error */
export type LogLevel = "debug" | "info" | "warn" | "error";

/** Objeto que representa un evento registrado, por ejemplo una llamada a la api */
export interface LogEntry {
  level: LogLevel;
  message: string; // Mensaje
  timestamp: string; // Cuando ocurrio
  context?: string; // Donde ocurrio
  data?: unknown; // Datos extra
  error?: {
    // En caso de error
    message: string;
    stack?: string;
  };
}

export interface LoggerOptions {
  context?: string; // Nombre del modulo que usara el logger
  minLevel?: LogLevel; //Nivel minimo
}
