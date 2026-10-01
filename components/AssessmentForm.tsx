import { FIELDS, GROUPS, GROUP_LABELS, type FieldKey } from "@/lib/api";

interface Props {
  values: Record<string, string>;
  onChange: (key: FieldKey, value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isPending: boolean;
}

export function AssessmentForm({ values, onChange, onSubmit, onClear, isPending }: Props) {
  return (
    <section className="bg-white border border-[#DCE3E5] rounded-2xl shadow-[0_1px_2px_rgba(21,34,41,0.04),0_8px_28px_rgba(21,34,41,0.06)]">
      <div className="p-6">
        <div className="mb-5">
          <h2 className="text-[16px] font-semibold">Patient assessment</h2>
          <div className="mt-0.5 text-[12px] text-[#5C6B72]">
            Enter clinical measurements to run a screening prediction.
          </div>
        </div>

        {GROUPS.map((group) => (
          <div key={group} className="mb-5.5">
            <div className="text-[12px] font-semibold text-[#0A5D65] tracking-[0.02em] mb-2.75 flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-[#E7ECED]">
              {GROUP_LABELS[group]}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FIELDS.filter((f) => f.group === group).map((f) => (
                <div key={f.key}>
                  <label className="block text-[0.8rem] text-[#5C6B72] mb-1.25 font-medium">
                    {f.label}
                  </label>
                  <div className="flex items-center bg-[#F7F9FA] border border-[#DCE3E5] rounded-[9px] overflow-hidden transition-[border-color,box-shadow] duration-150 focus-within:border-[#0E7C86] focus-within:shadow-[0_0_0_3px_#E3F0F1] focus-within:bg-white">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={values[f.key] ?? ""}
                      onChange={(e) => onChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="border-0 bg-transparent py-2.25 px-2.75 w-full font-mono text-[0.92rem] text-[#152229] font-medium outline-none"
                    />
                    {f.unit && (
                      <span className="font-sans text-[0.72rem] text-[#86959C] px-2.75 border-l border-[#DCE3E5] whitespace-nowrap bg-white self-stretch flex items-center">
                        {f.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-2.75 mt-5.5 pt-5 border-t border-[#E7ECED]">
          <button
            onClick={onSubmit}
            disabled={isPending}
            className="font-semibold text-[0.9rem] rounded-[9px] py-2.75 px-4.5 cursor-pointer border border-transparent flex-1 bg-[#0E7C86] text-white shadow-[0_4px_12px_rgba(14,124,134,0.24)] outline-none hover:bg-[#0A5D65] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Running…" : "Run screening"}
          </button>
          <button
            onClick={onClear}
            className="font-semibold text-[0.9rem] rounded-[9px] py-2.75 px-4.5 cursor-pointer border bg-white border-[#DCE3E5] text-[#5C6B72] outline-none hover:bg-[#F7F9FA] transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}