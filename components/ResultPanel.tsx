import type { UseMutationResult } from "@tanstack/react-query";
import type { PredictionResult, PatientData } from "@/lib/api";
import {
  IdleState,
  LoadingState,
  ErrorState,
  ResultState,
} from "./result-states";

interface Props {
  mutation: UseMutationResult<PredictionResult, Error, PatientData>;
}

export function ResultPanel({ mutation }: Props) {
  return (
    <section className="bg-white border border-[#DCE3E5] rounded-2xl shadow-[0_1px_2px_rgba(21,34,41,0.04),0_8px_28px_rgba(21,34,41,0.06)] md:self-stretch">
      <div className="pt-6 px-5 pb-5 sm:pt-6.5 sm:px-6.5 sm:pb-5.5 flex flex-col h-full">
        {mutation.isIdle && <IdleState />}
        {mutation.isPending && <LoadingState />}
        {mutation.isError && <ErrorState message={mutation.error.message} />}
        {mutation.isSuccess && <ResultState data={mutation.data} />}

        <div className="mt-auto text-[0.72rem] text-[#86959C] leading-[1.45] pt-3.5 border-t border-[#E7ECED]">
          <strong className="text-[#5C6B72] font-semibold">
            Research prototype — not for clinical use.
          </strong>{" "}
          This tool supports data curation research under the LCDI and does not
          replace examination or diagnosis by a qualified ophthalmologist.
        </div>
      </div>
    </section>
  );
}
