import { type PredictionResult } from "@/lib/api";
import { useCountUp } from "@/lib/useCountUp";

export function PanelHeader({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span
        className="w-2.25 h-2.25 rounded-full"
        style={{ background: color }}
      />
      <span className="text-[12px] font-semibold text-[#5C6B72]">
        Screening result
      </span>
    </div>
  );
}

export function IdleState() {
  return (
    <>
      <PanelHeader color="#DCE3E5" />
      <div className="flex-1 flex items-center justify-center text-center text-[13px] text-[#86959C] py-16">
        Enter patient data and run a screening to see results.
      </div>
    </>
  );
}

export function LoadingState() {
  return (
    <>
      <PanelHeader color="#0E7C86" />
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
        <div className="w-6 h-6 border-2 border-[#DCE3E5] border-t-[#0E7C86] rounded-full animate-spin" />
        <div className="text-[13px] text-[#5C6B72]">Running screening…</div>
        <div className="text-[11px] text-[#86959C] max-w-55">
          {/* First request may take up to a minute while the model wakes up. */}
        </div>
      </div>
    </>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <>
      <PanelHeader color="#B5531E" />
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-2">
        <div className="text-[14px] font-semibold text-[#B5531E]">
          Something went wrong
        </div>
        <div className="text-[12px] text-[#5C6B72] max-w-60">
          {message}. Check your connection and try again.
        </div>
      </div>
    </>
  );
}

export function ResultState({ data }: { data: PredictionResult }) {
  const isGlaucoma = data.prediction === "Glaucoma";
  const main = isGlaucoma ? "#B5531E" : "#2F7A55";
  const pct = Math.round(data.probability * 100);
  const animatedPct = useCountUp(pct);

  // Gauge settings (same approach as your GaugeChart)
  const size = 220;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = Math.PI * radius; // half-circle
  const strokeDashoffset = circumference - (data.probability) * circumference;

  return (
    <>
      <PanelHeader color={main} />
      <div className="flex flex-col items-center pt-1.5 pb-0.5">
        <div
          className="relative flex flex-col items-center justify-center"
          style={{ width: size, height: size / 2 + 40 }}
        >
          <svg
            width={size}
            height={size / 2 + 10}
            className="overflow-visible"
          >
            <path
              d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
              fill="none"
              stroke="#E7ECED"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth} ${center}`}
              fill="none"
              stroke={main}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          </svg>

          {/* Percentage in the center */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <div className="font-mono text-[40px] font-semibold text-[#152229] leading-none tracking-[-0.02em]">
              {Math.round(animatedPct)}
              <span className="text-[18px] text-[#5C6B72] font-medium">%</span>
            </div>
            <div className="text-[12px] text-[#5C6B72] mt-1.25">
              model probability
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center text-[32px] font-bold tracking-[-0.02em] mt-1.5 mb-0.75"
        style={{ color: main }}
      >
        {isGlaucoma ? "Glaucoma likely" : "No glaucoma"}
      </div>
      <div className="text-center text-[12px] text-[#5C6B72] mb-5">
        {isGlaucoma
          ? "Positive classification · flag for specialist review"
          : "Negative classification"}
      </div>

      <div className="bg-[#F7F9FA] border border-[#E7ECED] rounded-[11px] py-3.5 px-4 mb-4">
        <h3 className="text-[0.72rem] font-semibold text-[#5C6B72] mb-1">
          What influenced this prediction
        </h3>
        <p className="text-[0.68rem] text-[#86959C] mb-2.5 leading-[1.4]">
          How each measurement moved the model&apos;s output — not established
          clinical risk.
        </p>
        <div className="flex flex-col gap-1.75">
          {data.signals.map((s) => {
            const raises = s.direction === "raises";
            return (
              <div
                key={s.feature}
                className={`flex items-center gap-2.25 text-[0.8rem] py-2 px-3 rounded-lg ${
                  raises
                    ? "bg-[#F7E9DF] text-[#7d3a15]"
                    : "bg-[#EAF3EE] text-[#2F7A55]"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-none"
                >
                  {raises ? (
                    <>
                      <path
                        d="M12 8v5M12 16h.01"
                        stroke="#B5531E"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#B5531E"
                        strokeWidth="1.6"
                      />
                    </>
                  ) : (
                    <path
                      d="M8 12.5l2.5 2.5 5-6"
                      stroke="#2F7A55"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                {s.label}
                {s.value !== null && ` (${s.value})`}
                {" — "}
                {raises
                  ? "increased the model's score"
                  : "decreased the model's score"}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}