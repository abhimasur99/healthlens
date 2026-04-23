import { useState } from "react";
import { DATA } from "../data/patientData.js";

export default function usePatientData(day) {
  const [medState, setMedState] = useState({});
  const [flags, setFlags] = useState([]);

  function toggleMed(key) {
    setMedState((prev) => {
      const dayIndex = parseInt(key.split("-")[1]);
      const current = prev[key] ?? DATA[day].meds[dayIndex];
      return { ...prev, [key]: !current };
    });
  }

  function addFlag(flag) {
    setFlags((prev) => [...prev.filter((f) => f.id !== flag.id), flag]);
  }

  return { medState, flags, toggleMed, addFlag };
}
