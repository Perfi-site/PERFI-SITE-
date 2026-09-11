import crypto from "crypto";

const SALT_ROUNDS = 10;

/**
 * Hash a password using PBKDF2 with SHA-256.
 * For production, consider using bcrypt or argon2.
 */
export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(password, salt, 100000, 64, "sha256", (err, derived) => {
      if (err) reject(err);
      resolve(`${salt}:${derived.toString("hex")}`);
    });
  });
}

/**
 * Verify a password against a hash.
 */
export async function verify(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.pbkdf2(password, salt, 100000, 64, "sha256", (err, derived) => {
      if (err) reject(err);
      resolve(key === derived.toString("hex"));
    });
  });
}
