/** Constantes que nunca cambian entre entornos */

export const CURRENCY = "MXN";
export const IVA = 0.16;
export const PAGE_SIZE = 20;
export const ROLES = ["admin", "cashier"] as const;

/** Validador de variables de entorno del backend */
export function validateServerEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET", "PORT"];
  const missing = required.filter((key) => !process.env[key]); // filtra en el .env si no existe alguna variable

  if (missing.length > 0) {
    throw new Error(
      `Variables de entorno faltantes en app/server/.env: ${missing.join(", ")}\n`,
    );
  }

  return {
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    port: Number(process.env.PORT) || 3000,
  };
}

// Validador para el frontend
export function validateClientEnv() {
  const required = ["VITE_API_URL"];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Variables de entorno faltantes en apps/web: ${missing.join(", ")}`,
    );
  }

  return {
    apiUrl: import.meta.env.VITE_API_URL as string,
  };
}
