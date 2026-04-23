import { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage.jsx";
import MedLogger from "../components/MedLogger.jsx";
import { sendMessage } from "../agent/api.js";

const INIT_MSG = {
  id: "init", role: "assistant",
  text: "Hi! I'm your HealthLens assistant. Ask me anything about your recovery, medications, or progress.",
  isAgent: true, flagged: false,
};

export default function PatientAsk({ day, data, onFlag, onMedToggle }) {
  const [messages, setMessages] = useState([INIT_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMedLogger, setShowMedLogger] = useState(false);
  const bottomRef = useRef(null);
  const d = data[day];
  const todayIndex = d.meds.length - 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function toggleFlag(id) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const nowFlagged = !m.flagged;
        if (nowFlagged) onFlag({ id, text: m.text, day, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
        return { ...m, flagged: nowFlagged };
      })
    );
  }

  function handleMedLog(medIndex, timeOfDay) {
    const medName = d.medNames[medIndex];
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + "med",
        role: "assistant",
        text: `${medName} logged for ${timeOfDay}. Your record has been updated.`,
        isAgent: true,
        flagged: false,
      },
    ]);
    onMedToggle(`${medIndex}-${todayIndex}`);
    setShowMedLogger(false);
  }

  async function send(msg) {
    const userMsg = msg || input.trim();
    if (!userMsg) return;
    setInput("");
    const uid = Date.now() + "u";
    setMessages((prev) => [...prev, { id: uid, role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const reply = await sendMessage(messages, day, d);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + "a", role: "assistant", text: reply || "I'm having trouble responding. Please contact your care team.", isAgent: true, flagged: false },
      ]);
    } catch (err) {
      const errorText = err.message === "rate_limit"
        ? "Having trouble connecting. Please try again in a moment."
        : "Connection issue. Try again.";
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + "e", role: "assistant", text: errorText, isAgent: true, flagged: false },
      ]);
    }
    setLoading(false);
  }

  const quickActions = ["+ Log medication", "What's my score?", "When can I exercise?", "Am I on track?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", paddingBottom: 80 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px 0" }}>
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            role={m.role}
            text={m.text}
            isAgent={m.isAgent}
            flagged={m.flagged}
            onFlag={() => toggleFlag(m.id)}
          />
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 7 }}>
            <div style={{ background: "#F2F2F7", borderRadius: "18px 18px 18px 4px", padding: "9px 13px", display: "flex", gap: 4 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#8E8E93",
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: "8px 14px 0", borderTop: "0.5px solid #E5E5EA" }}>
        {showMedLogger && (
          <MedLogger
            medNames={d.medNames}
            medMorning={d.medMorning}
            medEvening={d.medEvening}
            onLog={handleMedLog}
            onDismiss={() => setShowMedLogger(false)}
          />
        )}
        <div style={{ display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" }}>
          {quickActions.map((q) => (
            <button
              key={q}
              onClick={() => q === "+ Log medication" ? setShowMedLogger(true) : send(q)}
              style={{ fontSize: 11, padding: "5px 10px", borderRadius: 14, background: "#F2F2F7", border: "none", color: "#007AFF", cursor: "pointer" }}
            >
              {q}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about your recovery…"
            style={{ flex: 1, padding: "9px 13px", borderRadius: 18, border: "1px solid #E5E5EA", fontSize: 14, background: "#F9F9F9", outline: "none" }}
          />
          <button
            onClick={() => send()}
            style={{ width: 34, height: 34, borderRadius: "50%", background: "#007AFF", border: "none", color: "white", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
