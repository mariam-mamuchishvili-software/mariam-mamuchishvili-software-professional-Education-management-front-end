import type { ReactNode } from "react";
import { ErrorState } from "../../partials/ErrorState";
import { LoadingState } from "../../partials/LoadingState";

interface AsyncContentProps<T> {
  /** A `useAsync` state. */
  state: { status: "loading" | "error" | "success"; data?: T; error?: string };
  onRetry: () => void;
  loadingLabel?: string;
  children: (data: T) => ReactNode;
}

/** Loading spinner, error with retry, or the loaded content of a `useAsync` state. */
export function AsyncContent<T>({ state, onRetry, loadingLabel, children }: AsyncContentProps<T>) {
  if (state.status === "loading") return <LoadingState label={loadingLabel} />;
  if (state.status === "error") return <ErrorState message={state.error ?? ""} onRetry={onRetry} />;
  return <>{children(state.data as T)}</>;
}
