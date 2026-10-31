export const DEPARTMENTS = ["CSE", "EEE", "BBA", "English"] as const;
export const BATCHES = ["Batch 51", "Batch 52", "Batch 53"] as const;
export const SECTIONS = ["Section A", "Section B", "Section C"] as const;

export type RegistrationInput = {
  fullName: string;
  studentId: string;
  email: string;
  department: string;
  batch: string;
  section: string;
  password: string;
};

export class RegistrationError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
    this.name = "RegistrationError";
  }
}

export function validateRegistration(body: unknown): RegistrationInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new RegistrationError("Please provide your registration details.");
  }
  const raw = body as Record<string, unknown>;
  const fields = ["fullName", "studentId", "email", "department", "batch", "section", "password"] as const;
  for (const field of fields) {
    if (typeof raw[field] !== "string") {
      throw new RegistrationError("Please complete all required fields.");
    }
  }
  const input: RegistrationInput = {
    fullName: (raw.fullName as string).trim(),
    studentId: (raw.studentId as string).trim(),
    email: (raw.email as string).trim().toLowerCase(),
    department: (raw.department as string).trim(),
    batch: (raw.batch as string).trim(),
    section: (raw.section as string).trim(),
    // Passwords must never be trimmed or silently changed.
    password: raw.password as string,
  };
  if (input.fullName.length < 2 || input.fullName.length > 150) {
    throw new RegistrationError("Full name must contain 2–150 characters.");
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]{0,49}$/.test(input.studentId)) {
    throw new RegistrationError("Enter a valid student ID (up to 50 letters, digits, dots, slashes, underscores, or hyphens).");
  }
  if (input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new RegistrationError("Enter a valid email address.");
  }
  if (!(DEPARTMENTS as readonly string[]).includes(input.department) ||
      !(BATCHES as readonly string[]).includes(input.batch) ||
      !(SECTIONS as readonly string[]).includes(input.section)) {
    throw new RegistrationError("Select a valid department, batch, and section.");
  }
  if (input.password.length < 12 || input.password.length > 128) {
    throw new RegistrationError("Password must contain 12–128 characters.");
  }
  return input;
}
