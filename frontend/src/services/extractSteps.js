export function extractSteps(stepsText) {
  if (typeof stepsText !== "string") return [];

  const parts = stepsText.split(/Korak\s*/).map(s => s.trim()).filter(Boolean);
  return parts;
}
