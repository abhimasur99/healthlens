import { useState } from "react";
import usePatientData from "./hooks/usePatientData.js";
import { DATA, DAYS, DAY_LABELS, PATIENT, PHYSICIAN } from "./data/patientData.js";
import RoleSelect from "./screens/RoleSelect.jsx";
import PatientStatus from "./screens/PatientStatus.jsx";
import PatientAsk from "./screens/PatientAsk.jsx";
import PatientReport from "./screens/PatientReport.jsx";
import PhysicianDashboard from "./screens/PhysicianDashboard.jsx";
import PhysicianReport from "./screens/PhysicianReport.jsx";
import TabIcon from "./components/TabIcon.jsx";

export default function App() {
  const [role, setRole] = useState(null);
  const [day, setDay] = useState(1);
  const [tab, setTab] = useState("status");
  const { medState, flags, toggleMed, addFlag } = usePatientData(day);

  function handleSelectPatient()  { setRole("patient");   setTab("status");    }
  function handleSelectPhysician() { setRole("physician"); setTab("dashboard"); }
  function handleSwitch()          { setRole(null);        setTab("status");    }

  if (!role) {
    return <RoleSelect onSelectPatient={handleSelectPatient} onSelectPhysician={handleSelectPhysician} />;
  }

  const patientTabs   = [{ key: "status",    label: "Status"    },
                         { key: "ask",        label: "Ask"       },
                         { key: "report",    label: "Report"    }];
  const physicianTabs = [{ key: "dashboard", label: "Dashboard" },
                         { key: "report",    label: "Report"    }];
  const tabs = role === "patient" ? patientTabs : physicianTabs;
  const flagBadge = flags.length > 0 && role === "physician";

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px 16px 24px", background: "#E5E5EA", minHeight: "100vh" }}>
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

        {/* Header + sim controls */}
        <div style={{ padding: "6px 18px 12px", background: "white", borderBottom: "0.5px solid #E5E5EA" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>
                {role === "patient" ? PATIENT.name : PHYSICIAN.full}
              </div>
              <div style={{ fontSize: 10, color: "#C7C7CC" }}>Day {day} of recovery</div>
            </div>
            <button
              onClick={handleSwitch}
              style={{ fontSize: 11, padding: "4px 9px", borderRadius: 9, background: "#F2F2F7", border: "none", color: "#8E8E93", cursor: "pointer" }}
            >
              Switch
            </button>
          </div>
          <div>
            <div style={{ fontSize: 9, color: "#C7C7CC", marginBottom: 4, letterSpacing: 0.6 }}>SIMULATION · ADVANCE TO DAY</div>
            <div style={{ display: "flex", gap: 4 }}>
              {DAYS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  style={{
                    flex: 1, padding: "5px 0", borderRadius: 9, fontSize: 12, fontWeight: 600,
                    border: d === day ? "none" : "1px solid #E5E5EA",
                    background: d === day ? "#007AFF" : "white",
                    color: d === day ? "white" : d === 18 ? "#FF9500" : d === 22 ? "#34C759" : "#3C3C43",
                    cursor: "pointer",
                  }}
                >
                  {DAY_LABELS[d]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
          {role === "patient"   && tab === "status"    && <PatientStatus    day={day} data={DATA} medState={medState} onMedToggle={toggleMed} />}
          {role === "patient"   && tab === "ask"        && <PatientAsk       day={day} data={DATA} onFlag={addFlag} onMedToggle={toggleMed} />}
          {role === "patient"   && tab === "report"    && <PatientReport    day={day} data={DATA} />}
          {role === "physician" && tab === "dashboard"  && <PhysicianDashboard day={day} data={DATA} flags={flags} />}
          {role === "physician" && tab === "report"    && <PhysicianReport  day={day} data={DATA} />}
        </div>

        {/* Tab bar */}
        <div style={{ borderTop: "0.5px solid #E5E5EA", background: "rgba(255,255,255,0.97)", padding: "8px 0 22px", display: "flex" }}>
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 0", position: "relative" }}
            >
              <TabIcon type={key} active={tab === key} />
              {key === "dashboard" && flagBadge && (
                <div style={{ position: "absolute", top: 2, right: "22%", width: 8, height: 8, borderRadius: "50%", background: "#FF9500", border: "1.5px solid white" }} />
              )}
              <span style={{ fontSize: 9, color: tab === key ? "#007AFF" : "#8E8E93", fontWeight: tab === key ? 600 : 400 }}>{label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
