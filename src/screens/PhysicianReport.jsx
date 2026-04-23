import Sparkline from "../components/Sparkline.jsx";
import { MED_CAL, PATIENT, PHYSICIAN, MISSED_DAYS } from "../data/patientData.js";
import { THRESHOLDS } from "../constants/thresholds.js";

const takenCount  = MED_CAL.filter((s) => s === "taken").length;
const adherencePct = Math.round((takenCount / MED_CAL.length) * 100);
const missedDayNums = MISSED_DAYS.map((i) => i + 1); // convert to 1-indexed day numbers

export default function PhysicianReport({ day, data }) {
  const d = data[day];

  return (
    <div style={{ padding: "16px 16px 100px", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E", marginBottom: 2 }}>Clinical Report</div>
      <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 16 }}>
        {PATIENT.name} · Day {day} · HealthLens Generated
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>30-DAY MEDICATION ADHERENCE</div>
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
        <div style={{ fontSize: 13, color: "#1C1C1E" }}>
          Adherence: <strong>{adherencePct}%</strong> over 30 days.{" "}
          {MISSED_DAYS.length > 0
            ? `${MISSED_DAYS.length} dose${MISSED_DAYS.length > 1 ? "s" : ""} missed (Day${MISSED_DAYS.length > 1 ? "s" : ""} ${missedDayNums.join("–")}).`
            : "Full adherence."}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>TRAJECTORY ANALYSIS</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <Sparkline data={d.trend} baseline={d.baseline} color={d.verdictColor} />
        </div>
        <div style={{ fontSize: 13, color: "#1C1C1E", lineHeight: 1.6 }}>
          Score at Day {day}: {d.score}/100 vs. baseline {d.baseline}.{" "}
          {d.score > d.baseline
            ? `+${d.score - d.baseline} above baseline. Favorable trajectory.`
            : `${d.baseline - d.score} below baseline. Follow-up recommended.`}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>CLINICAL VITALS</div>
        {[
          ["Heart rate",   `${d.hr} bpm`,            "Target <80",      d.hr > THRESHOLDS.HR_HIGH],
          ["Blood pressure", d.bp,                   "Target <130/80",  parseInt(d.bp) > THRESHOLDS.BP_SYSTOLIC_HIGH],
          ["Daily steps",  d.steps.toLocaleString(), `Target ${THRESHOLDS.STEPS_TARGET.toLocaleString()}+`, d.steps < THRESHOLDS.STEPS_LOW],
          ["Avg sleep",    `${d.sleep}h`,             "Target 7–9h",     d.sleep < THRESHOLDS.SLEEP_LOW],
          ["Weight",       `${d.weight} lbs`,         "Baseline 182 lbs", false],
        ].map(([label, value, target, flag]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "7px 0", borderBottom: "0.5px solid #E5E5EA" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{label}</div>
              <div style={{ fontSize: 10, color: "#8E8E93" }}>{target}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 6 }}>PHYSICIAN SUMMARY</div>
        <div style={{ fontSize: 13, color: "#1C1C1E", lineHeight: 1.7 }}>{d.physicianSummary}</div>
        <div style={{ fontSize: 10, color: "#8E8E93", marginTop: 8 }}>
          🤖 HealthLens AI · Clinical judgment supersedes agent analysis.
        </div>
      </div>
    </div>
  );
}
