import "server-only";
import type { ResultSetHeader } from "mysql2";
import { getDb } from "./db";
import { hashPassword } from "./password";
import { RegistrationError, type RegistrationInput } from "../registration";

export async function registerAccount(input: RegistrationInput): Promise<void> {
  const passwordHash = await hashPassword(input.password);
  const connection = await getDb().getConnection();
  try {
    await connection.beginTransaction();

    const [classResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO classes (department, batch, section)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
      [input.department, input.batch, input.section]
    );

    await connection.execute<ResultSetHeader>(
      `INSERT INTO users
         (class_id, full_name, student_id, email, password_hash, role)
       VALUES (?, ?, ?, ?, ?, 'student')`,
      [classResult.insertId, input.fullName, input.studentId, input.email, passwordHash]
    );

    await connection.commit();
  } catch (error) {
    try { await connection.rollback(); } catch { /* Keep the original error. */ }
    if (error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY") {
      throw new RegistrationError("An account with this email or student ID already exists.", 409);
    }
    throw error;
  } finally {
    connection.release();
  }
}
