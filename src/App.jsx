import { useState } from "react";
import usePatientData from "./hooks/usePatientData.js";
import { DATA, DAYS, PATIENT, PHYSICIAN, dayToDate, dayToShortDate } from "./data/patientData.js";
import RecoveryRing from "./components/RecoveryRing.jsx";
import RoleSelect from "./screens/RoleSelect.jsx";
import PatientStatus from "./screens/PatientStatus.jsx";
import PatientAsk from "./screens/PatientAsk.jsx";
import PatientReport from "./screens/PatientReport.jsx";
import PhysicianDashboard from "./screens/PhysicianDashboard.jsx";
import PhysicianReport from "./screens/PhysicianReport.jsx";
import TabIcon from "./components/TabIcon.jsx";

export default function App() {
  const [role, setRole] = useState(null);
  const [day,  setDay]  = useState(1);
  const [tab,  setTab]  = useState("status");
  const { medState, flags, toggleMed, markMedTaken, addFlag } = usePatientData(day);

  function handleSelectPatient()   { setRole("patient");   setTab("status");    }
  function handleSelectPhysician() { setRole("physician"); setTab("dashboard"); }
  function handleSwitch()          { setRole(null);        setTab("status");    }

  if (!role) {
    return <RoleSelect onSelectPatient={handleSelectPatient} onSelectPhysician={handleSelectPhysician} />;
  }

  const flagBadge = flags.length > 0 && role === "physician";

  // ── Physician iPad layout ──────────────────────────────────────────────────
  if (role === "physician") {
    return (
      <div style={{ minHeight: "100vh", background: "#F2F2F7" }}>

        {/* Header */}
        <div style={{ background: "white", borderBottom: "0.5px solid #E5E5EA", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          {/* Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>HL</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1E" }}>HealthLens</div>
              <div style={{ fontSize: 11, color: "#8E8E93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {PATIENT.name} · MRN {PATIENT.mrn} · {dayToDate(day)}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, background: "#F2F2F7", borderRadius: 10, padding: 3, flexShrink: 0 }}>
            {[["dashboard", "Dashboard"], ["report", "Report"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: "6px 18px", borderRadius: 8, border: "none",
                  background: tab === key ? "white" : "transparent",
                  color: tab === key ? "#1C1C1E" : "#8E8E93",
                  fontSize: 13, fontWeight: tab === key ? 600 : 400, cursor: "pointer",
                  boxShadow: tab === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  position: "relative",
                }}
              >
                {label}
                {key === "dashboard" && flagBadge && (
                  <span style={{ marginLeft: 5, background: "#FF9500", color: "white", borderRadius: 10, fontSize: 10, padding: "1px 5px" }}>
                    {flags.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Simulation + Switch */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 9, color: "#C7C7CC", letterSpacing: 0.8, marginBottom: 4, textAlign: "right" }}>SIMULATION</div>
              <div style={{ display: "flex", gap: 3 }}>
                {DAYS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    style={{
                      padding: "4px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                      border: d === day ? "none" : "1px solid #E5E5EA",
                      background: d === day ? "#007AFF" : "white",
                      color: d === day ? "white" : "#3C3C43",
                      cursor: "pointer",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSwitch}
              style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, background: "#F2F2F7", border: "none", color: "#8E8E93", cursor: "pointer" }}
            >
              Switch
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", maxWidth: 1000, margin: "0 auto", padding: "20px 20px 40px", gap: 16, alignItems: "flex-start" }}>

          {/* Left sidebar */}
          <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "white", borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 12 }}>RECOVERY STATUS</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                <RecoveryRing d={DATA[day]} size={140} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                  ["HR",    `${DATA[day].hr} bpm`,            DATA[day].hr > 85],
                  ["BP",    DATA[day].bp,                      parseInt(DATA[day].bp) > 130],
                  ["Steps", DATA[day].steps.toLocaleString(),  DATA[day].steps < 1000],
                  ["Sleep", `${DATA[day].sleep}h`,             DATA[day].sleep < 6],
                ].map(([label, value, flag]) => (
                  <div key={label} style={{ background: "#F2F2F7", borderRadius: 8, padding: "7px 9px" }}>
                    <div style={{ fontSize: 9, color: "#8E8E93" }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 6 }}>ATTENDING PHYSICIAN</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{PHYSICIAN.full}</div>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ flex: 1, background: "white", borderRadius: 14, overflow: "hidden", height: "calc(100vh - 100px)" }}>
            {tab === "dashboard" && <PhysicianDashboard day={day} data={DATA} flags={flags} />}
            {tab === "report"    && <PhysicianReport    day={day} data={DATA} />}
          </div>
        </div>
      </div>
    );
  }

  // ── Patient phone layout ───────────────────────────────────────────────────
  const patientTabs = [
    { key: "status", label: "Status" },
    { key: "ask",    label: "Ask"    },
    { key: "report", label: "Report" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 24px", background: "#E5E5EA", minHeight: "100vh" }}>

      {/* Simulation bar — outside phone frame */}
      <div style={{ width: 360, marginBottom: 10, background: "white", borderRadius: 10, padding: "8px 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 9, color: "#C7C7CC", letterSpacing: 0.8, marginBottom: 5 }}>SIMULATION · SELECT DAY</div>
        <div style={{ display: "flex", gap: 4 }}>
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              style={{
                flex: 1, padding: "5px 0", borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: d === day ? "none" : "1px solid #E5E5EA",
                background: d === day ? "#007AFF" : "white",
                color: d === day ? "white" : "#3C3C43",
                cursor: "pointer",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Phone frame */}
      <div style={{
        width: 360, background: "white", borderRadius: 44,
        boxShadow: "0 0 0 9px #1C1C1E, 0 20px 60px rgba(0,0,0,0.3)",
        overflow: "hidden", display: "flex", flexDirection: "column",
        height: 760, position: "relative",
      }}>

        {/* Status bar */}
        <div style={{ background: "white", padding: "14px 24px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>9:41</div>
          <div style={{ width: 80, height: 18, background: "#1C1C1E", borderRadius: 10 }} />
          <div style={{ fontSize: 11, color: "#1C1C1E", letterSpacing: 1 }}>●●●</div>
        </div>

        {/* Header */}
        <div style={{ padding: "4px 18px 10px", background: "white", borderBottom: "0.5px solid #E5E5EA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{PATIENT.name}</div>
            <div style={{ fontSize: 10, color: "#8E8E93" }}>{dayToShortDate(day)} · Day {day} post-discharge</div>
          </div>
          <button
            onClick={handleSwitch}
            style={{ fontSize: 11, padding: "4px 9px", borderRadius: 9, background: "#F2F2F7", border: "none", color: "#8E8E93", cursor: "pointer" }}
          >
            Switch
          </button>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
          {tab === "status" && <PatientStatus day={day} data={DATA} medState={medState} onMedToggle={toggleMed} />}
          {tab === "ask"    && <PatientAsk    day={day} data={DATA} onFlag={addFlag} onMedMark={markMedTaken} />}
          {tab === "report" && <PatientReport day={day} data={DATA} />}
        </div>

        {/* Tab bar */}
        <div style={{ borderTop: "0.5px solid #E5E5EA", background: "rgba(255,255,255,0.97)", padding: "8px 0 22px", display: "flex" }}>
          {patientTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
            >
              <TabIcon type={key} active={tab === key} />
              <span style={{ fontSize: 9, color: tab === key ? "#007AFF" : "#8E8E93", fontWeight: tab === key ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
