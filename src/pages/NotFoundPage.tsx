import { CompassIcon } from "lucide-react";
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <CompassIcon className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">გვერდი ვერ მოიძებნა</h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        მისამართი, რომელსაც ეძებთ, არ არსებობს ან გადატანილია სხვა ადგილას.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        მთავარ გვერდზე დაბრუნება
      </Link>
    </div>
  );
}
