import Sparkline from "../components/Sparkline.jsx";
import { MED_CAL, PATIENT, PHYSICIAN, MISSED_DAYS, DATA, dayToShortDate } from "../data/patientData.js";
import { THRESHOLDS } from "../constants/thresholds.js";

export default function PhysicianReport({ day, data }) {
  const d = data[day];

  const activeMedCal  = MED_CAL.slice(0, day);
  const takenCount    = activeMedCal.filter((s) => s === "taken").length;
  const adherencePct  = Math.round((takenCount / activeMedCal.length) * 100);
  const missedDayNums = MISSED_DAYS.filter((i) => i < day).map((i) => i + 1);

  return (
    <div style={{ padding: "16px 16px 40px", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1E", marginBottom: 2 }}>Clinical Report</div>
      <div style={{ fontSize: 12, color: "#8E8E93", marginBottom: 16 }}>
        {PATIENT.name} · Day {day} · {dayToShortDate(day)} · HealthLens Generated
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>30-DAY MEDICATION ADHERENCE</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((x, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 9, color: "#8E8E93" }}>{x}</div>
          ))}
          {Array.from({ length: 30 }, (_, i) => {
            const isPast = i < day;
            const status = isPast ? MED_CAL[i] : "pending";
            return (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: "50%", margin: "0 auto",
                background: isPast ? (status === "taken" ? "#34C759" : "#FF3B30") : "#E5E5EA",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, color: isPast ? "white" : "#C7C7CC", fontWeight: 600,
              }}>
                {i + 1}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 13, color: "#1C1C1E", marginBottom: 8 }}>
          Adherence: <strong>{adherencePct}%</strong> through Day {day}.{" "}
          {missedDayNums.length > 0
            ? `${missedDayNums.length} dose${missedDayNums.length > 1 ? "s" : ""} missed (Day${missedDayNums.length > 1 ? "s" : ""} ${missedDayNums.join("–")}).`
            : "Full adherence."}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[["#34C759", "Taken"], ["#FF3B30", "Missed"], ["#E5E5EA", "Upcoming"]].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#8E8E93" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>TRAJECTORY ANALYSIS</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <Sparkline data={d.trend} baseline={d.baseline} color={d.accent} />
        </div>
        <div style={{ fontSize: 13, color: "#1C1C1E", lineHeight: 1.6 }}>
          Day {day} recovery index: {d.score !== undefined ? d.score : "—"} vs. baseline {d.baseline}.{" "}
          {d.trend[d.trend.length - 1] > d.baseline
            ? `Trend above baseline. Favorable trajectory.`
            : `Trend below baseline. Follow-up recommended.`}
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: 14, marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>CLINICAL VITALS</div>
        {[
          ["Heart rate",     `${d.hr} bpm`,                `Target <${THRESHOLDS.HR_HIGH}`,                       d.hr > THRESHOLDS.HR_HIGH],
          ["Blood pressure", d.bp,                          "Target <130/80",                                      parseInt(d.bp) > THRESHOLDS.BP_SYSTOLIC_HIGH],
          ["Daily steps",    d.steps.toLocaleString(),      `Target ${THRESHOLDS.STEPS_TARGET.toLocaleString()}+`, d.steps < THRESHOLDS.STEPS_LOW],
          ["Avg sleep",      `${d.sleep}h`,                 "Target 7–9h",                                         d.sleep < THRESHOLDS.SLEEP_LOW],
          ["Weight",         `${d.weight} lbs`,             `Baseline ${DATA[1].weight} lbs`,                      false],
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
          HealthLens AI · Clinical judgment supersedes agent analysis.
        </div>
      </div>
    </div>
  );
}
