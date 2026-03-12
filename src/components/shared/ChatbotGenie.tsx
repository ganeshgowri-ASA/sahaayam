"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

// ── Conversation flows ────────────────────────────────────────────────────────

interface BotReply {
  text: string;
  suggestions?: string[];
}

function getBotReply(input: string): BotReply {
  const q = input.toLowerCase().trim();

  // Account unlock
  if (
    q.includes("account") ||
    q.includes("locked") ||
    q.includes("lock") ||
    q.includes("unlock")
  ) {
    return {
      text: "To unlock your account:\n1. Visit the IT Service Portal at itsm.example.com\n2. Click **Account Unlock** under Quick Services\n3. Enter your employee ID and verify via mobile OTP\n4. Your account will be unlocked within 2 minutes.\n\nIf the issue persists, contact the L1 Help Desk at helpdesk@example.com.",
      suggestions: ["Password reset", "Contact L1 Help Desk", "Go to Account Unlock SOP"],
    };
  }

  // Password reset
  if (
    q.includes("password") ||
    q.includes("forgot") ||
    q.includes("reset")
  ) {
    return {
      text: "To reset your password:\n1. Go to the IT Service Portal\n2. Select **Password Reset**\n3. Verify your identity via registered email or mobile\n4. Set a new password following the policy (min 12 chars, uppercase, number, special char)\n\nFor AD password reset, reach out to helpdesk@example.com.",
      suggestions: ["Account unlock", "Password policy link", "Contact Help Desk"],
    };
  }

  // VPN
  if (q.includes("vpn") || q.includes("remote") || q.includes("connect")) {
    return {
      text: "For VPN access:\n1. Ensure you have the VPN client installed (request via Software Installation service)\n2. Use your AD credentials to log in\n3. If you face MFA issues, contact the L2 Network Support team\n\nSee the **VPN Access** service on the portal for step-by-step guidance.",
      suggestions: ["Software installation", "Contact L2 Network Support"],
    };
  }

  // Software
  if (q.includes("software") || q.includes("install") || q.includes("application")) {
    return {
      text: "To request software installation:\n1. Check the **Approved Software List** first\n2. Raise a **Software Installation** ticket on the IT Service Portal\n3. L1 Help Desk will review and remotely install within 4 business hours.\n\nUnlicensed software cannot be installed per company policy.",
      suggestions: ["Approved software list", "Raise a ticket", "Contact Help Desk"],
    };
  }

  // Hardware
  if (q.includes("hardware") || q.includes("laptop") || q.includes("monitor") || q.includes("device")) {
    return {
      text: "To request hardware:\n1. Submit a **New Hardware Request** via the IT Service Portal\n2. Provide your manager's approval details\n3. Hardware is provisioned based on role and availability — typically 3–5 business days.",
      suggestions: ["New hardware request", "Asset inventory"],
    };
  }

  // Escalation
  if (
    q.includes("escalate") ||
    q.includes("escalation") ||
    q.includes("l2") ||
    q.includes("l1") ||
    q.includes("team")
  ) {
    return {
      text: "Here are the escalation teams:\n- **L1 Help Desk** — helpdesk@example.com (general IT issues)\n- **L2 Network Support** — network-support@example.com\n- **L2 Server Team** — server-team@example.com\n- **Security Ops** — secops@example.com\n- **App Support** — app-support@example.com",
      suggestions: ["Account unlock", "Password reset", "VPN issue"],
    };
  }

  // SOP
  if (q.includes("sop") || q.includes("procedure") || q.includes("guide") || q.includes("steps")) {
    return {
      text: "I can guide you to the right SOP. What are you looking for?\n- **Account Unlock SOP**\n- **Onboarding Checklist**\n- **Offboarding Procedure**\n- **Incident Response SOP**\n- **Data Backup SOP**\n- **Patch Management SOP**",
      suggestions: ["Account unlock SOP", "Onboarding checklist", "Incident response"],
    };
  }

  // Greetings
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("help") ||
    q === ""
  ) {
    return {
      text: "Hi! I am Genie, your IT support assistant. I can help you with:\n- Account unlock\n- Password reset\n- VPN access\n- Software/hardware requests\n- Escalation team contacts\n- SOPs and procedures\n\nWhat do you need help with today?",
      suggestions: ["Account unlock", "Password reset", "VPN issue", "Escalation teams"],
    };
  }

  // Default fallback
  return {
    text: "I'm not sure about that. Here are some common topics I can help with:",
    suggestions: ["Account unlock", "Password reset", "VPN issue", "Software install", "Escalation teams"],
  };
}

// ── Markdown-lite renderer (bold only) ───────────────────────────────────────

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChatbotGenie() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getBotReply("hello");
      setMessages([
        {
          id: "init",
          role: "bot",
          text: greeting.text,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  function addMessage(role: "user" | "bot", text: string) {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${role}`, role, text, timestamp: new Date() },
    ]);
  }

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    addMessage("user", msg);

    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(msg);
      setIsTyping(false);
      addMessage("bot", reply.text);
      if (reply.suggestions?.length) {
        // Attach suggestions as a follow-up synthetic bot message after short delay
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-suggestions`,
              role: "bot",
              text: `__suggestions__:${reply.suggestions!.join("|")}`,
              timestamp: new Date(),
            },
          ]);
        }, 300);
      }
    }, 700);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        aria-label="Open Genie chatbot"
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-200 ${
          isOpen && !isMinimized ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        {/* Robot icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20 12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a8.001 8.001 0 0 1 7-7.93V3a1 1 0 0 1 1-1ZM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-7-3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H7.5Z" />
        </svg>
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30 animate-ping" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-100 transition-all duration-300 ${
            isMinimized ? "h-14 w-72" : "h-[520px] w-[360px]"
          }`}
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 rounded-t-2xl bg-indigo-600 px-4 py-3 text-white shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20 12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a8.001 8.001 0 0 1 7-7.93V3a1 1 0 0 1 1-1ZM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-7-3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H7.5Z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-none">Genie</p>
              <p className="text-xs text-indigo-200 mt-0.5">IT Support Assistant</p>
            </div>
            <button
              onClick={() => setIsMinimized((v) => !v)}
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              className="rounded p-1 hover:bg-white/10 transition-colors"
            >
              {isMinimized ? (
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded p-1 hover:bg-white/10 transition-colors"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body — hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((msg) => {
                  // Suggestion chips
                  if (msg.text.startsWith("__suggestions__:")) {
                    const chips = msg.text.replace("__suggestions__:", "").split("|");
                    return (
                      <div key={msg.id} className="flex flex-wrap gap-2 pl-2">
                        {chips.map((chip) => (
                          <button
                            key={chip}
                            onClick={() => handleSend(chip)}
                            className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    );
                  }

                  const isBot = msg.role === "bot";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      {isBot && (
                        <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20 12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a8.001 8.001 0 0 1 7-7.93V3a1 1 0 0 1 1-1ZM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-7-3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H7.5Z" />
                          </svg>
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          isBot
                            ? "rounded-tl-none bg-gray-100 text-gray-800"
                            : "rounded-tr-none bg-indigo-600 text-white"
                        }`}
                      >
                        {renderText(msg.text)}
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20 12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a8.001 8.001 0 0 1 7-7.93V3a1 1 0 0 1 1-1ZM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-7-3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H7.5Z" />
                      </svg>
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-gray-100 px-4 py-2.5">
                      <span className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-100 px-3 py-2.5 shrink-0">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask Genie anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    aria-label="Send message"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
