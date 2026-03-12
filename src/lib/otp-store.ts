// In-memory OTP store for demo/testing purposes.
// In production, replace with Redis or a database-backed solution.

interface OtpEntry {
  code: string;
  type: "mobile" | "email";
  expiresAt: number;
  used: boolean;
}

class OtpStore {
  private store = new Map<string, OtpEntry>();

  private key(identifier: string, type: string) {
    return `${type}:${identifier}`;
  }

  generate(identifier: string, type: "mobile" | "email"): string {
    // For demo: always use 123456
    const code = "123456";
    const key = this.key(identifier, type);
    this.store.set(key, {
      code,
      type,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      used: false,
    });
    return code;
  }

  verify(identifier: string, code: string, type: "mobile" | "email"): boolean {
    const key = this.key(identifier, type);
    const entry = this.store.get(key);

    if (!entry) return false;
    if (entry.used) return false;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }
    if (entry.code !== code) return false;

    // Mark as used
    entry.used = true;
    this.store.set(key, entry);
    // Clean up after short delay
    setTimeout(() => this.store.delete(key), 5000);
    return true;
  }
}

// Singleton across the server process
export const otpStore = new OtpStore();
