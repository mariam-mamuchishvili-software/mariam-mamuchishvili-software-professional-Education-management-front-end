import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/60 px-6 py-16 text-center dark:border-red-900/40 dark:bg-red-950/20">
      <AlertTriangle className="size-7 text-red-500 dark:text-red-400" aria-hidden="true" />
      <p className="max-w-sm text-sm font-medium text-red-700 dark:text-red-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          ხელახლა ცდა
        </button>
      )}
    </div>
  );
}
