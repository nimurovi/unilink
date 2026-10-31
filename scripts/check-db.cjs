const { loadEnvConfig } = require("@next/env");
const mysql = require("mysql2/promise");

loadEnvConfig(process.cwd(), true);

async function checkDatabase() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME,
            connectTimeout: 10000,
        });

        const [rows] = await connection.query(
            "SELECT DATABASE() AS database_name, 1 AS connection_ok"
        );

        console.log("Database connection successful!");
        console.log("Connected database:", rows[0].database_name);
    } catch (error) {
        console.error("Database connection failed.");
        console.error("Error code:", error.code || "UNKNOWN");

        const explanations = {
            ECONNREFUSED:
                "Start MySQL in XAMPP and check the port in .env.local.",
            ER_ACCESS_DENIED_ERROR:
                "Check your database username and password in .env.local.",
            ER_BAD_DB_ERROR:
                "The database was not found. Check that unilink exists.",
            ETIMEDOUT:
                "Connection timed out. Check that MySQL is running.",
        };

        console.error(
            explanations[error.code] ||
            "Check your database settings and send me this error code."
        );

        process.exitCode = 1;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

checkDatabase().catch(() => {
    console.error("The database check could not finish.");
    process.exitCode = 1;
});