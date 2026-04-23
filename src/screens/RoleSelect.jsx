import RecoveryRing from "../components/RecoveryRing.jsx";
import { DATA } from "../data/patientData.js";

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function RoleSelect({ onSelectPatient, onSelectPhysician }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", padding: 24,
      background: "linear-gradient(160deg, #EBF0F7 0%, #F5F7FA 60%, #E8EEF6 100%)",
    }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
            <RecoveryRing d={DATA[30]} size={150} showLegend={false} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "#007AFF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>HL</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1C1C1E", letterSpacing: -0.5 }}>HealthLens</div>
          </div>
          <div style={{ fontSize: 14, color: "#3C3C43", marginBottom: 4 }}>Post-discharge recovery monitoring</div>
          <div style={{ fontSize: 11, color: "#8E8E93" }}>30-day intelligent monitoring · Human-on-loop care</div>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 1, background: "rgba(60,60,67,0.12)", marginBottom: 20 }} />

        {/* Role cards */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          <button
            onClick={onSelectPatient}
            style={{
              padding: "16px 18px", borderRadius: 16, border: "none",
              background: "#007AFF", color: "white",
              fontSize: 15, fontWeight: 600, cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 4px 16px rgba(0,122,255,0.25)",
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <PersonIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div>I&apos;m a Patient</div>
              <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>
                Track recovery · Ask questions · Log meds
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.7 }}>›</div>
          </button>

          <button
            onClick={onSelectPhysician}
            style={{
              padding: "16px 18px", borderRadius: 16,
              border: "1.5px solid #007AFF", background: "white",
              color: "#007AFF", fontSize: 15, fontWeight: 600,
              cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: "#EBF3FF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CrossIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div>I&apos;m a Care Provider</div>
              <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2, color: "#3C3C43" }}>
                Dashboard · Clinical reports · Alerts
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.5 }}>›</div>
          </button>
        </div>

        {/* Footer */}
        <div style={{ fontSize: 10, color: "#C7C7CC", textAlign: "center" }}>
          Prototype · Synthetic data · Not for clinical use
        </div>

      </div>
    </div>
  );
}
