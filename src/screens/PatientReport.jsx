import Sparkline from "../components/Sparkline.jsx";
import { MED_CAL, PHYSICIAN } from "../data/patientData.js";
import { THRESHOLDS } from "../constants/thresholds.js";

export default function PatientReport({ day, data }) {
  const d = data[day];

  return (
    <div style={{ padding: "16px 16px 100px", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E", marginBottom: 2 }}>Recovery Report</div>
      <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 16 }}>Day {day} · Shared with {PHYSICIAN.name}</div>

      <div style={{ background: d.verdictBg, borderRadius: 14, padding: 14, marginBottom: 10, border: `1px solid ${d.verdictColor}30` }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: d.verdictColor, letterSpacing: 0.5 }}>OVERALL STATUS</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: d.verdictColor, margin: "3px 0" }}>{d.verdict}</div>
        <div style={{ fontSize: 13, color: "#3C3C43" }}>Score: {d.score}/100</div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>30-DAY MEDICATION CALENDAR</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((x, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 9, color: "#8E8E93" }}>{x}</div>
          ))}
          {MED_CAL.map((status, i) => (
            <div key={i} style={{
              width: 26, height: 26, borderRadius: "50%", margin: "0 auto",
              background: status === "taken" ? "#34C759" : "#FF3B30",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, color: "white", fontWeight: 600,
            }}>
              {i + 1}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[["#34C759", "Taken"], ["#FF3B30", "Missed"]].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#8E8E93" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>7-DAY TREND</div>
        <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
          <Sparkline data={d.trend} baseline={d.baseline} color={d.verdictColor} />
        </div>
        <div style={{ fontSize: 11, color: "#8E8E93", textAlign: "center", marginTop: 4 }}>
          Dashed = baseline ({d.baseline})
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>VITALS SUMMARY</div>
        {[
          ["Heart rate",    `${d.hr} bpm`,                d.hr > THRESHOLDS.HR_HIGH],
          ["Blood pressure", d.bp,                        parseInt(d.bp) > THRESHOLDS.BP_SYSTOLIC_HIGH],
          ["Daily steps",   d.steps.toLocaleString(),     d.steps < THRESHOLDS.STEPS_LOW],
          ["Sleep",         `${d.sleep} hrs`,             d.sleep < THRESHOLDS.SLEEP_LOW],
          ["Weight",        `${d.weight} lbs`,            false],
        ].map(([label, value, flag]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid #E5E5EA" }}>
            <span style={{ fontSize: 13, color: "#3C3C43" }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
