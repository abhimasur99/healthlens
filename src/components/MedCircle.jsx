export default function MedCircle({ done, onToggle, label }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 28, height: 28, borderRadius: "50%",
        background: done ? "#34C759" : "transparent",
        border: `2px solid ${done ? "#34C759" : "#D1D1D6"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: 8,
        color: done ? "white" : "#8E8E93", padding: 0,
      }}
    >
      {done ? "✓" : label}
    </button>
  );
}
