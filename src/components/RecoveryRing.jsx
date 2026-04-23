function Ring({ cx, cy, r, percent, color }) {
  const circ = 2 * Math.PI * r;
  const fill = (Math.max(0, Math.min(100, percent)) / 100) * circ;
  return (
    <g transform={`rotate(-90 ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={8} strokeOpacity={0.15} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={8}
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
      />
    </g>
  );
}

export function computeRings(d) {
  const systolic = parseInt(d.bp);
  const vitals = Math.min(100, Math.round(
    Math.max(0, d.hr <= 85 ? 50 : 50 - (d.hr - 85) * 5) +
    Math.max(0, systolic <= 130 ? 50 : 50 - (systolic - 130) * 3)
  ));
  const activity = Math.min(100, Math.round(
    Math.min(d.steps / 3000, 1) * 50 + Math.min(d.sleep / 7, 1) * 50
  ));
  const taken = d.meds.filter(Boolean).length;
  const adherence = Math.round((taken / d.meds.length) * 100);
  return { vitals, activity, adherence };
}

export default function RecoveryRing({ d, size = 120, showLegend = true }) {
  const { vitals, activity, adherence } = computeRings(d);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        <Ring cx={60} cy={60} r={50} percent={vitals}    color="#007AFF" />
        <Ring cx={60} cy={60} r={37} percent={activity}  color="#34C759" />
        <Ring cx={60} cy={60} r={24} percent={adherence} color="#5856D6" />
      </svg>
      {showLegend && (
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {[["#007AFF", "Vitals"], ["#34C759", "Activity"], ["#5856D6", "Adherence"]].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, color: "#8E8E93" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
