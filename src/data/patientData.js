export const PATIENT   = { name: "James Carter", mrn: "00441" };
export const PHYSICIAN = { name: "Dr. Patel", full: "Dr. Priya Patel · Cardiology" };

export const DAYS      = [1, 14, 18, 22, 30];
export const DAY_LABELS = { 1: "1", 14: "14", 18: "18", 22: "22", 30: "30" };
export const APP_VERSION = "V9";

// Discharge date: April 5, 2026
export const DISCHARGE_DATE = new Date(2026, 3, 5);

export function dayToDate(day) {
  const d = new Date(DISCHARGE_DATE);
  d.setDate(d.getDate() + day - 1);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function dayToMediumDate(day) {
  const d = new Date(DISCHARGE_DATE);
  d.setDate(d.getDate() + day - 1);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function dayToShortDate(day) {
  const d = new Date(DISCHARGE_DATE);
  d.setDate(d.getDate() + day - 1);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const MISSED_DAYS = [13, 14];
export const MED_CAL = Array.from({ length: 30 }, (_, i) =>
  MISSED_DAYS.includes(i) ? "missed" : "taken"
);

export const DATA = {
  1: {
    accent: "#007AFF",
    trend: [72, 74, 75, 76, 77, 78, 78],
    baseline: 75,
    hr: 68,
    bp: "118/76",
    steps: 1240,
    sleep: 7.1,
    weight: 182,
    meds: [true, true, true, true, true, true, true],
    medNames: ["Metoprolol", "Aspirin", "Lisinopril", "Atorvastatin"],
    medMorning: [true, true, false, false],
    medEvening: [null, null, true, true],
    behavioral: {
      sleepTiming:     { label: "Sleep timing",     value: "±11 min variance",          flag: false, note: "Consistent"  },
      activityPattern: { label: "Activity pattern", value: "Even distribution",         flag: false, note: "Balanced"    },
      communication:   { label: "Communication",    value: "Active · 14 interactions",  flag: false, note: "Normal"      },
    },
    digest: {
      title: "You are off to a good start.",
      body:  "Heart rate and blood pressure are in a healthy range. Keep activity light today — short walks are ideal.",
      tag:   "DAY 1 · STABLE",
    },
    physicianSummary: "Patient recovering as expected. Vitals within target range. No escalation needed.",
    escalation: false,
    physicianFlags: ["All metrics nominal", "Medication adherence 100%"],
  },
  14: {
    accent: "#007AFF",
    trend: [72, 74, 76, 78, 79, 80, 82],
    baseline: 75,
    hr: 65,
    bp: "114/72",
    steps: 3800,
    sleep: 7.4,
    weight: 180,
    meds: [true, true, true, true, true, true, true],
    medNames: ["Metoprolol", "Aspirin", "Lisinopril", "Atorvastatin"],
    medMorning: [true, true, true, false],
    medEvening: [null, null, true, true],
    behavioral: {
      sleepTiming:     { label: "Sleep timing",     value: "±18 min variance",          flag: false, note: "Consistent"  },
      activityPattern: { label: "Activity pattern", value: "Morning dominant",          flag: false, note: "Normal"      },
      communication:   { label: "Communication",    value: "Active · 11 interactions",  flag: false, note: "Normal"      },
    },
    digest: {
      title: "Two weeks strong.",
      body:  "Recovery is trending in the right direction. Steps are increasing steadily. Keep building on this.",
      tag:   "DAY 14 · IMPROVING",
    },
    physicianSummary: "Two-week check: patient improving steadily. Activity levels increasing appropriately. Recommend advancing activity protocol.",
    escalation: false,
    physicianFlags: ["Trajectory above baseline", "Consider activity upgrade"],
  },
  18: {
    accent: "#FF9500",
    trend: [72, 74, 76, 78, 79, 80, 61],
    baseline: 75,
    hr: 88,
    bp: "138/88",
    steps: 890,
    sleep: 5.2,
    weight: 184,
    meds: [true, false, true, true, false, true, true],
    medNames: ["Metoprolol", "Aspirin", "Lisinopril", "Atorvastatin"],
    medMorning: [true, false, true, false],
    medEvening: [null, null, true, true],
    behavioral: {
      sleepTiming:     { label: "Sleep timing",     value: "±74 min variance",              flag: true,  note: "Disrupted"    },
      activityPattern: { label: "Activity pattern", value: "Largely sedentary",             flag: true,  note: "Below range"  },
      communication:   { label: "Communication",    value: "Reduced · 3 interactions",      flag: true,  note: "Withdrawn"    },
    },
    digest: {
      title: "A few things to keep an eye on.",
      body:  "Your readings today are a bit outside your usual range. Rest, stay hydrated, and keep taking your medications. Dr. Patel has been notified and will be in touch today.",
      tag:   "DAY 18 · WATCH",
    },
    physicianSummary: "Significant decline at Day 18. HR elevated, BP above threshold, activity sharply reduced, sleep disrupted. Missed doses on Days 17 and 18. Recommend same-day contact.",
    escalation: true,
    physicianFlags: [
      "HR 88 bpm — above target (<85)",
      "BP 138/88 — elevated (target <130/80)",
      "Missed doses Days 17–18",
      "Steps 890 — below minimum (target 3,000+)",
    ],
  },
  22: {
    accent: "#007AFF",
    trend: [61, 63, 66, 68, 70, 71, 72],
    baseline: 75,
    hr: 79,
    bp: "128/82",
    steps: 2100,
    sleep: 6.4,
    weight: 182,
    meds: [true, true, true, true, true, true, true],
    medNames: ["Metoprolol", "Aspirin", "Lisinopril", "Atorvastatin"],
    medMorning: [true, true, true, false],
    medEvening: [null, null, true, true],
    behavioral: {
      sleepTiming:     { label: "Sleep timing",     value: "±31 min variance",              flag: false, note: "Stabilizing"  },
      activityPattern: { label: "Activity pattern", value: "Morning dominant",              flag: false, note: "Improving"    },
      communication:   { label: "Communication",    value: "Recovering · 7 interactions",   flag: true,  note: "Below normal" },
    },
    digest: {
      title: "Turning a corner.",
      body:  "Things are stabilizing after the Day 18 dip. Heart rate is coming down. Keep the steady pace.",
      tag:   "DAY 22 · RECOVERING",
    },
    physicianSummary: "Post-alert recovery: Day 22 shows meaningful improvement across all flagged metrics. HR returning to range, activity improving, adherence restored. Continue monitoring through Day 30.",
    escalation: false,
    physicianFlags: ["HR returning to target range", "Activity improving", "Adherence restored"],
  },
  30: {
    accent: "#007AFF",
    trend: [61, 65, 70, 75, 80, 86, 91],
    baseline: 75,
    hr: 62,
    bp: "112/70",
    steps: 6200,
    sleep: 7.8,
    weight: 179,
    meds: [true, true, true, true, true, true, true],
    medNames: ["Metoprolol", "Aspirin", "Lisinopril", "Atorvastatin"],
    medMorning: [true, true, true, true],
    medEvening: [null, null, true, true],
    behavioral: {
      sleepTiming:     { label: "Sleep timing",     value: "±14 min variance",         flag: false, note: "Consistent"  },
      activityPattern: { label: "Activity pattern", value: "Even distribution",        flag: false, note: "Excellent"   },
      communication:   { label: "Communication",    value: "Active · 13 interactions", flag: false, note: "Normal"      },
    },
    digest: {
      title: "Month one complete.",
      body:  "You have made it 30 days. Recovery is progressing well. Continue your current routine and follow up with Dr. Patel as scheduled.",
      tag:   "DAY 30 · ON TRACK",
    },
    physicianSummary: "Excellent 30-day outcome. All vitals at target or better. Activity level exceeds protocol. Patient cleared for return-to-work assessment.",
    escalation: false,
    physicianFlags: ["All vitals at target", "Activity exceeds protocol", "Recommend return-to-work evaluation"],
  },
};
