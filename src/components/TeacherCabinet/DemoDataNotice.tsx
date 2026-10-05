import { FlaskConical } from "lucide-react";

/**
 * Flags sections backed by mock data: the `/api/me/*` endpoints need a signed-in teacher,
 * which the cabinet doesn't have yet. Remove once authentication is wired up.
 */
export function DemoDataNotice() {
  return (
    <p className="mb-6 flex items-start gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
      <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      ნაჩვენებია სადემონსტრაციო მონაცემები — რეალური ჩანაწერები ავტორიზაციის დამატების შემდეგ ჩაიტვირთება.
    </p>
  );
}
