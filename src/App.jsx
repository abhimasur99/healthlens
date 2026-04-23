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

  // ── Shared outside-frame top bar ──────────────────────────────────────────
  function TopBar({ width }) {
    return (
      <div style={{
        width, marginBottom: 10,
        background: "white", borderRadius: 10, padding: "8px 14px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontSize: 9, color: "#C7C7CC", letterSpacing: 0.8, flexShrink: 0 }}>SIMULATION</div>
        <div style={{ display: "flex", gap: 4 }}>
          {DAYS.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              style={{
                padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600,
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
        <button
          onClick={handleSwitch}
          style={{ fontSize: 12, padding: "5px 11px", borderRadius: 8, background: "#F2F2F7", border: "none", color: "#8E8E93", cursor: "pointer", flexShrink: 0 }}
        >
          Switch Role
        </button>
      </div>
    );
  }

  // ── Physician MacBook layout ───────────────────────────────────────────────
  if (role === "physician") {
    const LAPTOP_W   = 920;
    const BEZEL_H    = 14;  // top bezel inside aluminum
    const SCREEN_W   = LAPTOP_W - 28; // 14px each side
    const SCREEN_H   = 570;
    const BASE_H     = 32;

    return (
      <div style={{ minHeight: "100vh", background: "#E5E5EA", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 32px" }}>
        <TopBar width={LAPTOP_W} />

        {/* Aluminum body */}
        <div style={{
          width: LAPTOP_W,
          background: "linear-gradient(to bottom, #3D3D3F, #2A2A2C)",
          borderRadius: "14px 14px 0 0",
          padding: `${BEZEL_H}px 14px 0`,
        }}>
          {/* Camera dot */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A4A4A" }} />
          </div>

          {/* Screen */}
          <div style={{
            width: SCREEN_W, height: SCREEN_H,
            background: "white",
            borderRadius: "4px 4px 0 0",
            border: "2px solid #1C1C1E",
            overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            {/* Screen header */}
            <div style={{ background: "white", borderBottom: "0.5px solid #E5E5EA", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
              {/* Identity */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>HL</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1E" }}>HealthLens</div>
                  <div style={{ fontSize: 10, color: "#8E8E93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {PATIENT.name} · MRN {PATIENT.mrn} · {dayToShortDate(day)}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 2, background: "#F2F2F7", borderRadius: 9, padding: 3, flexShrink: 0 }}>
                {[["dashboard", "Dashboard"], ["report", "Report"]].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      padding: "5px 16px", borderRadius: 7, border: "none",
                      background: tab === key ? "white" : "transparent",
                      color: tab === key ? "#1C1C1E" : "#8E8E93",
                      fontSize: 12, fontWeight: tab === key ? 600 : 400, cursor: "pointer",
                      boxShadow: tab === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      position: "relative",
                    }}
                  >
                    {label}
                    {key === "dashboard" && flagBadge && (
                      <span style={{ marginLeft: 4, background: "#FF9500", color: "white", borderRadius: 10, fontSize: 9, padding: "1px 4px" }}>
                        {flags.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Physician name */}
              <div style={{ fontSize: 11, color: "#8E8E93", flexShrink: 0 }}>{PHYSICIAN.full}</div>
            </div>

            {/* Screen body */}
            <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "#F2F2F7" }}>
              {/* Sidebar */}
              <div style={{ width: 220, flexShrink: 0, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto", background: "#F2F2F7" }}>
                <div style={{ background: "white", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>RECOVERY STATUS</div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                    <RecoveryRing d={DATA[day]} size={120} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                    {[
                      ["HR",    `${DATA[day].hr} bpm`,            DATA[day].hr > 85],
                      ["BP",    DATA[day].bp,                      parseInt(DATA[day].bp) > 130],
                      ["Steps", DATA[day].steps.toLocaleString(),  DATA[day].steps < 1000],
                      ["Sleep", `${DATA[day].sleep}h`,             DATA[day].sleep < 6],
                    ].map(([label, value, flag]) => (
                      <div key={label} style={{ background: "#F2F2F7", borderRadius: 7, padding: "6px 8px" }}>
                        <div style={{ fontSize: 9, color: "#8E8E93" }}>{label}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "white", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 5 }}>ATTENDING</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>{PHYSICIAN.full}</div>
                </div>
              </div>

              {/* Main panel */}
              <div style={{ flex: 1, background: "white", borderLeft: "0.5px solid #E5E5EA", overflowY: "auto" }}>
                {tab === "dashboard" && <PhysicianDashboard day={day} data={DATA} flags={flags} />}
                {tab === "report"    && <PhysicianReport    day={day} data={DATA} />}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div style={{
          width: LAPTOP_W + 40,
          height: BASE_H,
          background: "linear-gradient(to bottom, #3A3A3C, #2A2A2C)",
          borderRadius: "0 0 10px 10px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 100, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.04)" }} />
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
      <TopBar width={360} />

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

        {/* Header — name + date only, no Switch */}
        <div style={{ padding: "4px 18px 10px", background: "white", borderBottom: "0.5px solid #E5E5EA" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{PATIENT.name}</div>
          <div style={{ fontSize: 10, color: "#8E8E93" }}>{dayToShortDate(day)} · Day {day} post-discharge</div>
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
