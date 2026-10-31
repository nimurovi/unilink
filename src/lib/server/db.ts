import "server-only";
import mysql, { type Pool } from "mysql2/promise";

const databaseGlobal = globalThis as typeof globalThis & {
  unilinkDatabasePool?: Pool;
};

export function getDb(): Pool {
  if (databaseGlobal.unilinkDatabasePool) return databaseGlobal.unilinkDatabasePool;

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const database = process.env.DB_NAME;
  const port = Number(process.env.DB_PORT || 3306);

  if (!host || !user || !database || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Database configuration is missing or invalid.");
  }

  databaseGlobal.unilinkDatabasePool = mysql.createPool({
    host,
    port,
    user,
    database,
    password: process.env.DB_PASSWORD ?? "",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 20,
    connectTimeout: 10000,
    charset: "utf8mb4",
    timezone: "Z",
    multipleStatements: false,
  });

  return databaseGlobal.unilinkDatabasePool;
}
