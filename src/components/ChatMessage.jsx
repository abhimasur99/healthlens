export default function ChatMessage({ role, text, isAgent, flagged, onFlag }) {
  return (
    <div style={{ display: "flex", justifyContent: role === "user" ? "flex-end" : "flex-start", marginBottom: 7 }}>
      <div style={{ maxWidth: "80%" }}>
        <div style={{
          padding: "9px 13px",
          borderRadius: role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: role === "user" ? "#007AFF" : flagged ? "#FFF8E6" : "#F2F2F7",
          color: role === "user" ? "white" : "#1C1C1E",
          fontSize: 14, lineHeight: 1.5,
          border: flagged ? "1px solid #FF9500" : undefined,
        }}>
          {text}
        </div>
        {isAgent && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, paddingLeft: 4 }}>
            <span style={{ fontSize: 9, color: "#8E8E93" }}>🤖 HealthLens Agent · Not medical advice</span>
            <button
              onClick={onFlag}
              style={{
                fontSize: 9, color: flagged ? "#FF9500" : "#C7C7CC",
                background: "none", border: "none", cursor: "pointer",
                padding: 0, fontWeight: flagged ? 600 : 400,
              }}
            >
              {flagged ? "⚑ Flagged" : "⚐ Flag for care team"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
