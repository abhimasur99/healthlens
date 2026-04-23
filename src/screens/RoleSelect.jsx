export default function RoleSelect({ onSelectPatient, onSelectPhysician }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", padding: 24, background: "#E5E5EA",
    }}>
      <div style={{ width: 330 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>❤️</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#1C1C1E", marginBottom: 3 }}>HealthLens</div>
          {/* Fix 2 — updated tagline */}
          <div style={{ fontSize: 14, color: "#8E8E93", marginBottom: 2 }}>Post-discharge recovery monitoring</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={onSelectPatient}
            style={{
              padding: "16px 22px", borderRadius: 16, border: "none",
              background: "#007AFF", color: "white",
              fontSize: 16, fontWeight: 600, cursor: "pointer", textAlign: "left",
            }}
          >
            <div>I'm a Patient</div>
            <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2 }}>
              Track recovery · Ask questions · Log meds
            </div>
          </button>
          <button
            onClick={onSelectPhysician}
            style={{
              padding: "16px 22px", borderRadius: 16,
              border: "1.5px solid #007AFF", background: "white",
              color: "#007AFF", fontSize: 16, fontWeight: 600,
              cursor: "pointer", textAlign: "left",
            }}
          >
            <div>I'm a Care Provider</div>
            <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.85, marginTop: 2, color: "#3C3C43" }}>
              Dashboard · Clinical reports · Alerts
            </div>
          </button>
        </div>
        {/* Fix 1 — hypothesis card removed */}
      </div>
    </div>
  );
}
