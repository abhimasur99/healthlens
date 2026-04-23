import { useState, useEffect } from "react";
import Sparkline from "../components/Sparkline.jsx";
import { PATIENT, PHYSICIAN } from "../data/patientData.js";
import { THRESHOLDS } from "../constants/thresholds.js";

export default function PhysicianDashboard({ day, data, flags }) {
  const d = data[day];
  const [disposition, setDisposition] = useState(null);
  const [showLearning, setShowLearning] = useState(false);

  // Fix 3 — reset disposition state when day changes so it stays scoped to Day 18
  useEffect(() => {
    setDisposition(null);
    setShowLearning(false);
  }, [day]);

  function handleDisposition(label) {
    setDisposition(label);
    setTimeout(() => setShowLearning(true), 400);
  }

  return (
    <div style={{ padding: "16px 16px 100px", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E", marginBottom: 2 }}>Patient Overview</div>
      <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 14 }}>
        {PATIENT.name} · Day {day} · MRN {PATIENT.mrn}
      </div>

      {flags.length > 0 && (
        <div style={{ background: "#FFF8E6", border: "1.5px solid #FF9500", borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#FF6D00", letterSpacing: 0.5, marginBottom: 8 }}>
            ⚑ PATIENT FLAGS — {flags.length} message{flags.length > 1 ? "s" : ""}
          </div>
          {flags.map((f, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, padding: "9px 12px", marginBottom: 6, border: "0.5px solid #E5E5EA" }}>
              <div style={{ fontSize: 10, color: "#8E8E93", marginBottom: 3 }}>Day {f.day} · {f.time}</div>
              <div style={{ fontSize: 13, color: "#1C1C1E", lineHeight: 1.4 }}>{f.text}</div>
            </div>
          ))}
        </div>
      )}

      {d.escalation && !disposition && (
        <div style={{ background: "#FFF3E0", border: "2px solid #FF6D00", borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#E65100", letterSpacing: 0.5, marginBottom: 4 }}>⚠ AUTO-ALERT — PATIENT DECLINING</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#BF360C", marginBottom: 3 }}>HealthLens flagged significant decline at Day 18.</div>
          <div style={{ fontSize: 12, color: "#E65100", marginBottom: 10 }}>HR 88 · BP 138/88 · 2 missed doses · 890 steps · Sleep 5.2h</div>
          <div style={{ fontSize: 12, color: "#3C3C43", marginBottom: 8 }}>Select disposition:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["Call patient today",    "#007AFF"],
              ["Schedule urgent visit", "#FF9500"],
              ["Monitor — no action",   "#34C759"],
              ["Escalate to ED",        "#FF3B30"],
            ].map(([label, color]) => (
              <button
                key={label}
                onClick={() => handleDisposition(label)}
                style={{ padding: "9px 14px", borderRadius: 9, border: `1.5px solid ${color}`, background: "white", color, fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {disposition && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ background: "#E8F9ED", borderRadius: 10, padding: "10px 14px", border: "1px solid #34C759", marginBottom: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E8449" }}>✓ Disposition logged: {disposition}</div>
          </div>
          {showLearning && (
            <div style={{ background: "#E6F1FF", borderRadius: 10, padding: "9px 14px", border: "1px solid #007AFF" }}>
              <div style={{ fontSize: 11, color: "#007AFF", fontWeight: 600, marginBottom: 2 }}>AGENT UPDATED</div>
              <div style={{ fontSize: 12, color: "#185FA5" }}>Alert threshold adjusted for this patient profile. Future alerts will reflect disposition pattern.</div>
            </div>
          )}
        </div>
      )}

      {day === 22 && (
        <div style={{ background: "#E8F9ED", border: "1.5px solid #34C759", borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#1E8449", letterSpacing: 0.5, marginBottom: 4 }}>✓ RECOVERY CONFIRMED · DAY 22</div>
          <div style={{ fontSize: 13, color: "#1E8449", lineHeight: 1.4 }}>Intervention at Day 18 effective. All flagged metrics trending toward baseline. No further escalation needed.</div>
        </div>
      )}

      <div style={{ background: d.verdictBg, borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: d.verdictColor, letterSpacing: 0.5 }}>RECOVERY STATUS</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: d.verdictColor }}>{d.verdict}</div>
            <div style={{ fontSize: 12, color: "#3C3C43" }}>Score {d.score}/100</div>
          </div>
          <Sparkline data={d.trend} baseline={d.baseline} color={d.verdictColor} />
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>BEHAVIORAL SIGNALS</div>
        {Object.values(d.behavioral).map(({ label, value, flag, note }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "0.5px solid #E5E5EA" }}>
            <span style={{ fontSize: 13, color: "#3C3C43" }}>{label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</span>
              <span style={{ fontSize: 10, color: flag ? "#FF9500" : "#34C759", fontWeight: 600 }}>{note}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>CLINICAL FLAGS</div>
        {d.physicianFlags.map((flag, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 0", borderBottom: "0.5px solid #E5E5EA" }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", marginTop: 5, flexShrink: 0,
              background: flag.toLowerCase().includes("above") || flag.toLowerCase().includes("missed") || flag.toLowerCase().includes("elevated")
                ? "#FF9500" : "#34C759",
            }} />
            <span style={{ fontSize: 13, color: "#1C1C1E" }}>{flag}</span>
          </div>
        ))}
        <div style={{ fontSize: 10, color: "#8E8E93", marginTop: 7 }}>🤖 HealthLens Agent · Review before clinical action</div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>VITALS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["HR",    `${d.hr} bpm`,          d.hr > THRESHOLDS.HR_HIGH],
            ["BP",    d.bp,                    parseInt(d.bp) > THRESHOLDS.BP_SYSTOLIC_HIGH],
            ["Steps", d.steps.toLocaleString(), d.steps < THRESHOLDS.STEPS_LOW],
            ["Sleep", `${d.sleep}h`,           d.sleep < THRESHOLDS.SLEEP_LOW],
          ].map(([label, value, flag]) => (
            <div key={label} style={{ background: flag ? "#FFF3E0" : "white", borderRadius: 9, padding: "9px 10px", border: flag ? "1px solid #FF9500" : "0.5px solid #E5E5EA" }}>
              <div style={{ fontSize: 10, color: "#8E8E93" }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 6 }}>CLINICAL SUMMARY</div>
        <div style={{ fontSize: 13, color: "#1C1C1E", lineHeight: 1.6 }}>{d.physicianSummary}</div>
      </div>
    </div>
  );
}
