export default function Sparkline({ data, baseline, color }) {
  const w = 180, h = 44;
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const xStep = w / (data.length - 1);
  const toY = (v) => h - ((v - min) / (max - min)) * h;
  const pts = data.map((v, i) => `${i * xStep},${toY(v)}`).join(" ");

  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <line
        x1={0} y1={toY(baseline)} x2={w} y2={toY(baseline)}
        stroke="#E0E0E0" strokeWidth={1} strokeDasharray="3,3"
      />
      <polyline
        points={pts} fill="none"
        stroke={color} strokeWidth={2.5}
        strokeLinejoin="round" strokeLinecap="round"
      />
      {data.map((v, i) => (
        <circle
          key={i}
          cx={i * xStep} cy={toY(v)}
          r={i === data.length - 1 ? 4 : 2}
          fill={i === data.length - 1 ? color : "white"}
          stroke={color} strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}
