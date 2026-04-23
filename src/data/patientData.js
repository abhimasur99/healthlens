// Patient and physician identity — single source of truth
export const PATIENT = { name: "James Carter", mrn: "00441" };
export const PHYSICIAN = { name: "Dr. Patel", full: "Dr. Priya Patel · Cardiology" };

// Simulation days and their display labels
export const DAYS = [1, 14, 18, 22, 30];
export const DAY_LABELS = { 1: "1", 14: "14", 18: "⚠18", 22: "↑22", 30: "30" };

// App metadata
export const APP_VERSION = "V9";

// Medication calendar — derived from named constants, not magic indices
export const MISSED_DAYS = [13, 14]; // zero-indexed positions in the 30-day calendar
export const MED_CAL = Array.from({ length: 30 }, (_, i) =>
  MISSED_DAYS.includes(i) ? "missed" : "taken"
);

// Full patient simulation data
export const DATA = {
  1: {
    verdict: "Good",
    verdictColor: "#34C759",
    verdictBg: "#E8F9ED",
    score: 78,
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
      sleepTiming: { label: "Sleep timing", value: "±11 min variance", flag: false, note: "Consistent" },
      activityPattern: { label: "Activity pattern", value: "Even distribution", flag: false, note: "Balanced" },
      socialEngagement: { label: "Social engagement", value: "3.8 hrs screen time", flag: false, note: "Normal" },
    },
    digest: {
      title: "You're on track.",
      body: "Heart rate steady. Blood pressure normal. Keep today light — short walks only.",
      tag: "DAY 1 · STABLE",
    },
    physicianSummary: "Patient recovering as expected. Vitals within target range. No escalation needed.",
    escalation: false,
    physicianFlags: ["All metrics nominal", "Medication adherence 100%"],
  },
  14: {
    verdict: "Good",
    verdictColor: "#34C759",
    verdictBg: "#E8F9ED",
    score: 82,
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
      sleepTiming: { label: "Sleep timing", value: "±18 min variance", flag: false, note: "Consistent" },
      activityPattern: { label: "Activity pattern", value: "Morning dominant", flag: false, note: "Normal" },
      socialEngagement: { label: "Social engagement", value: "3.2 hrs screen time", flag: false, note: "Normal" },
    },
    digest: {
      title: "Two weeks strong.",
      body: "Recovery trending up. Steps increasing well. Ask about light cardio today.",
      tag: "DAY 14 · IMPROVING",
    },
    physicianSummary: "Two-week check: patient improving steadily. Activity levels increasing appropriately. Recommend advancing activity protocol.",
    escalation: false,
    physicianFlags: ["Trajectory above baseline", "Consider activity upgrade"],
  },
  18: {
    verdict: "Fair",
    verdictColor: "#FF9500",
    verdictBg: "#FFF3E0",
    score: 61,
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
      sleepTiming: { label: "Sleep timing", value: "±74 min variance", flag: true, note: "Disrupted" },
      activityPattern: { label: "Activity pattern", value: "Largely sedentary", flag: true, note: "Below range" },
      socialEngagement: { label: "Social engagement", value: "0.9 hrs screen time", flag: true, note: "Withdrawn" },
    },
    digest: {
      title: "Something shifted.",
      body: "Heart rate up. Sleep dropped. Blood pressure higher than usual. Your doctor has been alerted.",
      tag: "DAY 18 · WATCH",
    },
    physicianSummary: "ALERT: Significant decline at Day 18. HR elevated, BP above threshold, activity sharply reduced, sleep disrupted. Missed 2 medications. Recommend same-day contact.",
    escalation: true,
    physicianFlags: [
      "HR 88 bpm — above target",
      "BP 138/88 — elevated",
      "Missed doses Day 17-18",
      "Activity: 890 steps (target 3000+)",
    ],
  },
  22: {
    verdict: "Fair",
    verdictColor: "#FF9500",
    verdictBg: "#FFF3E0",
    score: 72,
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
      sleepTiming: { label: "Sleep timing", value: "±31 min variance", flag: false, note: "Stabilizing" },
      activityPattern: { label: "Activity pattern", value: "Morning dominant", flag: false, note: "Improving" },
      socialEngagement: { label: "Social engagement", value: "2.1 hrs screen time", flag: true, note: "Below normal" },
    },
    digest: {
      title: "Turning a corner.",
      body: "Signals stabilizing after Day 18 dip. Heart rate coming down. Keep the momentum.",
      tag: "DAY 22 · RECOVERING",
    },
    physicianSummary: "Post-alert recovery: Day 22 shows meaningful improvement across all flagged metrics. HR returning to range, activity improving, adherence restored. Continue monitoring through Day 30.",
    escalation: false,
    physicianFlags: ["HR returning to range", "Activity improving", "Adherence restored"],
  },
  30: {
    verdict: "Great",
    verdictColor: "#007AFF",
    verdictBg: "#E6F1FF",
    score: 91,
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
      sleepTiming: { label: "Sleep timing", value: "±14 min variance", flag: false, note: "Consistent" },
      activityPattern: { label: "Activity pattern", value: "Even distribution", flag: false, note: "Excellent" },
      socialEngagement: { label: "Social engagement", value: "3.6 hrs screen time", flag: false, note: "Normal" },
    },
    digest: {
      title: "Month one: complete.",
      body: "You've made it 30 days. Recovery is excellent. Keep the momentum going.",
      tag: "DAY 30 · EXCELLENT",
    },
    physicianSummary: "Excellent 30-day outcome. All vitals at target or better. Activity level exceeds protocol. Patient cleared for return-to-work assessment.",
    escalation: false,
    physicianFlags: ["All vitals at target", "Activity exceeds protocol", "Recommend return-to-work eval"],
  },
};
