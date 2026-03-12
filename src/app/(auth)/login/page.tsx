"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthTab = "mobile" | "email" | "social";
type OtpStep = "identifier" | "verify";

const GOLD = "#d4a853";
const NAVY = "#1a1a2e";
const CARD = "#16213e";
const INPUT_BG = "#0f3460";
const INPUT_BORDER = "#1e4080";

// Simple toast component rendered inline
function Toast({ message, type }: { message: string; type: "success" | "error" | "info" }) {
  const colors: Record<string, string> = {
    success: "bg-green-900/80 border-green-600 text-green-200",
    error: "bg-red-900/80 border-red-600 text-red-200",
    info: "bg-blue-900/80 border-blue-600 text-blue-200",
  };
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm border ${colors[type]} font-mono whitespace-pre-wrap`}
    >
      {message}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200"
      style={{
        backgroundColor: active ? GOLD : "transparent",
        color: active ? NAVY : "#9ca3af",
        border: active ? `1px solid ${GOLD}` : "1px solid #1e4080",
      }}
    >
      {children}
    </button>
  );
}

function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 border outline-none transition-colors focus:border-yellow-500 disabled:opacity-60"
        style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER }}
      />
    </div>
  );
}

// ─── Mobile OTP Tab ───────────────────────────────────────────────────────────
function MobileOtpTab() {
  const router = useRouter();
  const [step, setStep] = useState<OtpStep>("identifier");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 8000);
  };

  const handleSendOtp = async () => {
    if (!mobile.trim()) {
      showToast("Please enter your mobile number.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: mobile.trim(), type: "mobile" }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error ?? "Failed to send OTP.", "error");
        return;
      }
      showToast(
        `OTP sent to ${mobile}\n\n[DEMO] Your OTP is: ${data.demoOtp}`,
        "success"
      );
      setStep("verify");
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      showToast("Please enter the OTP.", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("otp", {
        identifier: mobile.trim(),
        otp: otp.trim(),
        type: "mobile",
        redirect: false,
      });
      if (result?.error) {
        showToast("Invalid or expired OTP. Please try again.", "error");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      showToast("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <InputField
        id="mobile"
        label="Mobile Number"
        type="tel"
        value={mobile}
        onChange={setMobile}
        placeholder="+91 98765 43210"
        disabled={step === "verify"}
      />

      {step === "verify" && (
        <InputField
          id="mobile-otp"
          label="Enter OTP"
          type="text"
          value={otp}
          onChange={setOtp}
          placeholder="6-digit OTP"
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}

      {step === "identifier" ? (
        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60 mt-2"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </button>
          <button
            onClick={() => {
              setStep("identifier");
              setOtp("");
              setToast(null);
            }}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Change mobile number
          </button>
        </>
      )}
    </div>
  );
}

// ─── Email OTP Tab ────────────────────────────────────────────────────────────
function EmailOtpTab() {
  const router = useRouter();
  const [step, setStep] = useState<OtpStep>("identifier");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 8000);
  };

  const handleSendOtp = async () => {
    if (!email.trim()) {
      showToast("Please enter your email address.", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email.trim(), type: "email" }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error ?? "Failed to send OTP.", "error");
        return;
      }
      showToast(
        `OTP sent to ${email}\n\n[DEMO] Your OTP is: ${data.demoOtp}`,
        "success"
      );
      setStep("verify");
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      showToast("Please enter the OTP.", "error");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("otp", {
        identifier: email.trim(),
        otp: otp.trim(),
        type: "email",
        redirect: false,
      });
      if (result?.error) {
        showToast("Invalid or expired OTP. Please try again.", "error");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      showToast("An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <InputField
        id="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@company.com"
        disabled={step === "verify"}
      />

      {step === "verify" && (
        <InputField
          id="email-otp"
          label="Enter OTP"
          type="text"
          value={otp}
          onChange={setOtp}
          placeholder="6-digit OTP"
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}

      {step === "identifier" ? (
        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60 mt-2"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity disabled:opacity-60"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </button>
          <button
            onClick={() => {
              setStep("identifier");
              setOtp("");
              setToast(null);
            }}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Change email address
          </button>
        </>
      )}
    </div>
  );
}

// ─── Social Login Tab ─────────────────────────────────────────────────────────
function SocialLoginTab() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <p className="text-lg font-semibold" style={{ color: GOLD }}>
        Social login coming soon
      </p>
      <p className="text-sm text-gray-400 text-center">
        Google and Microsoft sign-in will be available in a future update.
        Please use Mobile OTP or Email OTP to sign in.
      </p>
    </div>
  );
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("mobile");

  return (
    <div
      style={{ backgroundColor: NAVY }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{ backgroundColor: CARD }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold tracking-wide mb-1"
              style={{ color: GOLD }}
            >
              Sahaayam
            </h1>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Work Place Central
            </p>
            <div
              className="mt-4 h-0.5 w-16 mx-auto rounded"
              style={{ backgroundColor: GOLD }}
            />
            <p className="text-xs text-gray-500 mt-3">
              Sign in to access your workplace portal
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-6 p-1 rounded-xl" style={{ backgroundColor: "#0a1628" }}>
            <TabButton active={activeTab === "mobile"} onClick={() => setActiveTab("mobile")}>
              Mobile OTP
            </TabButton>
            <TabButton active={activeTab === "email"} onClick={() => setActiveTab("email")}>
              Email OTP
            </TabButton>
            <TabButton active={activeTab === "social"} onClick={() => setActiveTab("social")}>
              Social
            </TabButton>
          </div>

          {/* Tab content */}
          {activeTab === "mobile" && <MobileOtpTab />}
          {activeTab === "email" && <EmailOtpTab />}
          {activeTab === "social" && <SocialLoginTab />}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          First login automatically creates your account
        </p>
      </div>
    </div>
  );
}
