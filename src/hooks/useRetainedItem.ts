import { useState } from "react";

/**
 * Keeps the last loaded item on screen while it is re-fetched (e.g. when toggling
 * ?include= options), instead of swapping the whole page for a spinner.
 * Only retains the item while `id` still matches, so navigating to another
 * record still shows the normal loading state.
 */
export function useRetainedItem<T extends { id: number }>(current: T | undefined, isLoading: boolean, id: string) {
  const [last, setLast] = useState<T | null>(null);
  if (current && current !== last) {
    setLast(current);
  }

  const item = current ?? (isLoading && last && String(last.id) === id ? last : null);

  return { item, isRefreshing: isLoading && item !== null };
}
