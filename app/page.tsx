"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { predict, wakeApi, FIELDS, type PatientData, type FieldKey } from "@/lib/api";
import { Header } from "@/components/Header";
import { AssessmentForm } from "@/components/AssessmentForm";
import { ResultPanel } from "@/components/ResultPanel";

export default function Home() {
  const [values, setValues] = useState<Record<string, string>>({});
  const mutation = useMutation({ mutationFn: predict });

  useEffect(() => { wakeApi(); }, []);

  function setField(key: FieldKey, raw: string) {
    setValues((v) => ({ ...v, [key]: raw }));
  }

  function handleSubmit() {
    const payload: PatientData = {};
    for (const { key } of FIELDS) {
      const raw = values[key];
      if (raw !== undefined && raw.trim() !== "" && !isNaN(Number(raw))) {
        payload[key] = Number(raw);
      }
    }
    mutation.mutate(payload);
  }

  function handleClear() {
    setValues({});
    mutation.reset();
  }

  return (
    <main className="w-full max-w-300 mx-auto p-4 sm:p-7">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-5 mt-6 sm:mt-8 items-start">
        <AssessmentForm
          values={values}
          onChange={setField}
          onSubmit={handleSubmit}
          onClear={handleClear}
          isPending={mutation.isPending}
        />
        <ResultPanel mutation={mutation} />
      </div>
    </main>
  );
}