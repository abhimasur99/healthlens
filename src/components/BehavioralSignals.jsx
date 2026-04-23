export default function BehavioralSignals({ behavioral }) {
  return (
    <div style={{ background: "#F2F2F7", borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>
        BEHAVIORAL SIGNALS
      </div>
      {Object.values(behavioral).map(({ label, value, flag, note }) => (
        <div
          key={label}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: flag ? "#FFF3E0" : "white",
            borderRadius: 10, padding: "9px 12px", marginBottom: 6,
            border: flag ? "1px solid #FF9500" : "none",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#8E8E93", marginBottom: 1 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: flag ? "#E65100" : "#1C1C1E" }}>{value}</div>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600,
            color: flag ? "#FF9500" : "#34C759",
            background: flag ? "#FFF3E0" : "#E8F9ED",
            padding: "3px 8px", borderRadius: 8,
            border: `1px solid ${flag ? "#FF9500" : "#34C759"}`,
          }}>
            {note}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 9, color: "#C7C7CC", marginTop: 4 }}>
        Simulated from Apple Watch + iPhone usage patterns
      </div>
    </div>
  );
}
