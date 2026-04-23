import Sparkline from "../components/Sparkline.jsx";
import MedCircle from "../components/MedCircle.jsx";
import BehavioralSignals from "../components/BehavioralSignals.jsx";
import RecoveryRing from "../components/RecoveryRing.jsx";
import { THRESHOLDS } from "../constants/thresholds.js";
import { DISCHARGE_DATE, dayToShortDate } from "../data/patientData.js";

export default function PatientStatus({ day, data, medState, onMedToggle }) {
  const d = data[day];

  const daysToShow = Math.min(day, 7);
  const startIdx   = d.meds.length - daysToShow;

  function circleDate(di) {
    const date = new Date(DISCHARGE_DATE);
    date.setDate(date.getDate() + (day - daysToShow + di));
    return date.getDate();
  }

  return (
    <div style={{ padding: "0 16px 60px", overflowY: "auto", height: "100%" }}>

      {d.escalation && (
        <div style={{ margin: "14px 0 0", padding: "12px 14px", borderRadius: 14, background: "#FFF3E0", border: "1px solid #FF9500" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 3 }}>
            {dayToShortDate(day).toUpperCase()} · FOLLOW-UP SCHEDULED
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#E65100", lineHeight: 1.4 }}>Dr. Patel has been notified and will be in touch today.</div>
          <div style={{ fontSize: 12, color: "#E65100", marginTop: 3 }}>Continue taking your medications and rest as needed.</div>
        </div>
      )}

      {day === 22 && (
        <div style={{ margin: "14px 0 0", padding: "12px 14px", borderRadius: 14, background: "#E8F9ED", border: "1.5px solid #34C759" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#1E8449", letterSpacing: 0.5, marginBottom: 3 }}>FOLLOW-UP COMPLETE · {dayToShortDate(22).toUpperCase()}</div>
          <div style={{ fontSize: 13, color: "#1E8449", lineHeight: 1.4 }}>Dr. Patel reviewed your recent readings. Things are trending in the right direction — keep going.</div>
        </div>
      )}

      <div style={{ marginTop: d.escalation || day === 22 ? 14 : 20, display: "flex", justifyContent: "center" }}>
        <RecoveryRing d={d} size={130} />
      </div>

      <div style={{ margin: "14px 0", background: "#F2F2F7", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 8 }}>RECOVERY TREND</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Sparkline data={d.trend} baseline={d.baseline} color={d.accent} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "#8E8E93" }}>
          <span>Discharge</span>
          <span style={{ color: "#C7C7CC" }}>— baseline {d.baseline}</span>
          <span>Today</span>
        </div>
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>TODAY&apos;S NUMBERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { label: "Heart rate",     value: `${d.hr}`,                unit: "bpm",   flag: d.hr > THRESHOLDS.HR_HIGH },
            { label: "Blood pressure", value: d.bp,                     unit: "",      flag: parseInt(d.bp) > THRESHOLDS.BP_SYSTOLIC_HIGH },
            { label: "Steps",          value: d.steps.toLocaleString(), unit: "steps", flag: d.steps < THRESHOLDS.STEPS_LOW },
            { label: "Sleep",          value: d.sleep.toFixed(1),       unit: "hrs",   flag: d.sleep < THRESHOLDS.SLEEP_LOW },
          ].map(({ label, value, unit, flag }) => (
            <div key={label} style={{ background: flag ? "#FFF3E0" : "white", borderRadius: 10, padding: "9px 10px", border: flag ? "1px solid #FF9500" : "none" }}>
              <div style={{ fontSize: 10, color: "#8E8E93", marginBottom: 1 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E", lineHeight: 1 }}>{value}</div>
              {unit && <div style={{ fontSize: 10, color: "#8E8E93" }}>{unit}</div>}
            </div>
          ))}
        </div>
      </div>

      <BehavioralSignals behavioral={d.behavioral} />

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>THIS WEEK&apos;S MEDICATIONS</div>
        {d.medNames.map((name, mi) => (
          <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>{name}</div>
              <div style={{ fontSize: 10, color: "#8E8E93" }}>
                {d.medMorning[mi] !== null ? "8 AM" : ""}
                {d.medEvening[mi] ? (d.medMorning[mi] !== null ? " · 8 PM" : "8 PM") : ""}
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {d.meds.slice(startIdx).map((_, di) => (
                <MedCircle
                  key={startIdx + di}
                  done={medState[`${mi}-${startIdx + di}`] ?? d.meds[startIdx + di]}
                  onToggle={() => onMedToggle(`${mi}-${startIdx + di}`)}
                  label={String(circleDate(di))}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#F2F2F7", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 4 }}>TODAY&apos;S SUMMARY</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E", marginBottom: 3 }}>{d.digest.title}</div>
        <div style={{ fontSize: 13, color: "#3C3C43", lineHeight: 1.5 }}>{d.digest.body}</div>
        <div style={{ fontSize: 10, color: "#8E8E93", marginTop: 6 }}>HealthLens · Verify with your care team</div>
      </div>
    </div>
  );
}
