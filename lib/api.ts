const BASE = process.env.NEXT_PUBLIC_BASEURL;



export const FIELDS = [
  { key: "age",     label: "Age",                       unit: "years", group: "Patient",   placeholder: "63" },
  { key: "iop",     label: "Intraocular pressure",      unit: "mmHg",  group: "Ocular",    placeholder: "26.4" },
  { key: "cdr",     label: "Cup-to-disc ratio",         unit: "",      group: "Ocular",    placeholder: "0.72" },
  { key: "cct",     label: "Central corneal thickness", unit: "µm",    group: "Ocular",    placeholder: "512" },
  { key: "avg_dev", label: "Mean deviation (MD)",       unit: "dB",    group: "Perimetry", placeholder: "-8.3" },
  { key: "pat_dev", label: "Pattern std deviation",     unit: "dB",    group: "Perimetry", placeholder: "6.1" },
  { key: "ght1",    label: "Hemifield 1",               unit: "dB",    group: "Perimetry", placeholder: "0" },
  { key: "ght2",    label: "Hemifield 2",               unit: "dB",    group: "Perimetry", placeholder: "0" },
  { key: "ght3",    label: "Hemifield 3",               unit: "dB",    group: "Perimetry", placeholder: "0" },
  { key: "ght4",    label: "Hemifield 4",               unit: "dB",    group: "Perimetry", placeholder: "0" },
  { key: "ght5",    label: "Hemifield 5",               unit: "dB",    group: "Perimetry", placeholder: "0" },
] as const;

export type FieldKey = typeof FIELDS[number]["key"];
export type PatientData = Partial<Record<FieldKey, number>>;

export interface Signal {
  feature: string;
  label: string;
  value: number | null;
  contribution: number;
  direction: "raises" | "lowers";
}

export interface PredictionResult {
  prediction: "Glaucoma" | "No glaucoma";
  probability: number;
  signals: Signal[];
}

export async function predict(data: PatientData): Promise<PredictionResult> {
  const res = await fetch(`${BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Prediction failed (${res.status})`);
  return res.json();
}

export function wakeApi() {
  fetch(`${BASE}/healthz`).catch(() => {});
}

export const GROUPS = ["Patient", "Ocular", "Perimetry"] as const;
export const GROUP_LABELS: Record<string, string> = {
  Patient: "Patient",
  Ocular: "Ocular measurements",
  Perimetry: "Perimetry (visual field)",
};