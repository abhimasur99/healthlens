import { useState } from "react";

export default function MedLogger({ medNames, medMorning, medEvening, onLog, onDismiss }) {
  const [selectedMed, setSelectedMed] = useState(null);

  const btnBase = {
    padding: "8px 14px", borderRadius: 10, border: "1px solid #E5E5EA",
    background: "white", color: "#007AFF", fontSize: 13, fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={{
      background: "#F2F2F7", borderRadius: 14, padding: "12px 14px", marginBottom: 8,
    }}>
      {selectedMed === null ? (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>
            LOG MEDICATION — SELECT ONE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {medNames.map((name, i) => (
              <button key={name} onClick={() => setSelectedMed(i)} style={btnBase}>
                {name}
              </button>
            ))}
          </div>
          <button
            onClick={onDismiss}
            style={{ fontSize: 11, color: "#8E8E93", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#8E8E93", letterSpacing: 0.5, marginBottom: 10 }}>
            {medNames[selectedMed].toUpperCase()} — WHEN?
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {medMorning[selectedMed] && (
              <button onClick={() => onLog(selectedMed, "AM")} style={{ ...btnBase, background: "#E8F9ED", borderColor: "#34C759", color: "#1E8449" }}>
                AM
              </button>
            )}
            {medEvening[selectedMed] && (
              <button onClick={() => onLog(selectedMed, "PM")} style={{ ...btnBase, background: "#E6F1FF", borderColor: "#007AFF", color: "#007AFF" }}>
                PM
              </button>
            )}
          </div>
          <button
            onClick={() => setSelectedMed(null)}
            style={{ fontSize: 11, color: "#8E8E93", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
}
