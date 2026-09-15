import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "იტვირთება..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-24 text-slate-500 dark:text-slate-400"
    >
      <Loader2 className="size-7 animate-spin text-brand-600 dark:text-brand-400" aria-hidden="true" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
