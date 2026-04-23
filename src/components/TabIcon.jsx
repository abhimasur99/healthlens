export default function TabIcon({ type, active }) {
  const c = active ? "#007AFF" : "#8E8E93";

  if (type === "status") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2.5C6.3 2.5 2.5 6.3 2.5 11S6.3 19.5 11 19.5 19.5 15.7 19.5 11 15.7 2.5 11 2.5Z" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
      <path d="M7.5 11L10 13.5L14.5 9" stroke={active ? "white" : c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (type === "ask") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 4.5h16v10H12l-4 3v-3H3V4.5Z" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx="8" cy="10" r="1" fill={active ? "white" : c} />
      <circle cx="11" cy="10" r="1" fill={active ? "white" : c} />
      <circle cx="14" cy="10" r="1" fill={active ? "white" : c} />
    </svg>
  );

  if (type === "report") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="4" y="2" width="14" height="18" rx="2" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
      <line x1="7" y1="7" x2="15" y2="7" stroke={active ? "white" : c} strokeWidth={1.5} strokeLinecap="round" />
      <line x1="7" y1="10.5" x2="15" y2="10.5" stroke={active ? "white" : c} strokeWidth={1.5} strokeLinecap="round" />
      <line x1="7" y1="14" x2="11" y2="14" stroke={active ? "white" : c} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );

  if (type === "dashboard") return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2.5" y="2.5" width="7" height="7" rx="1.5" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
      <rect x="12.5" y="2.5" width="7" height="7" rx="1.5" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
      <rect x="2.5" y="12.5" width="7" height="7" rx="1.5" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
      <rect x="12.5" y="12.5" width="7" height="7" rx="1.5" fill={active ? "#007AFF" : "none"} stroke={c} strokeWidth={1.5} />
    </svg>
  );

  return null;
}
