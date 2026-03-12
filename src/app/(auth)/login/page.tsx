"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        employeeId,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid employee ID or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#1a1a2e" }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{ backgroundColor: "#16213e" }}
        >
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold tracking-wide mb-1"
              style={{ color: "#d4a853" }}
            >
              Sahaayam
            </h1>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Work Place Central
            </p>
            <div
              className="mt-4 h-0.5 w-16 mx-auto rounded"
              style={{ backgroundColor: "#d4a853" }}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Employee ID
              </label>
              <input
                id="employeeId"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter your employee ID"
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 border outline-none transition-colors focus:border-yellow-500"
                style={{
                  backgroundColor: "#0f3460",
                  borderColor: "#1e4080",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 border outline-none transition-colors focus:border-yellow-500"
                style={{
                  backgroundColor: "#0f3460",
                  borderColor: "#1e4080",
                }}
              />
            </div>

            {error && (
              <div className="rounded-lg px-4 py-3 text-sm text-red-300 bg-red-900/30 border border-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60 mt-2"
              style={{
                backgroundColor: "#d4a853",
                color: "#1a1a2e",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
