import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function CallToAction() {
  return (
    <section className="border-t border-slate-200 bg-brand-600">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          მზად ხართ დაიწყოთ თქვენი საგანმანათლებლო გზა?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">
          გაეცანით ჯგუფებს და მასწავლებლებს, რომლებიც უკავშირდებიან თითოეულ პროფესიასა და მოდულს.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/groups"
            className="flex items-center gap-1.5 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            ჯგუფების ნახვა
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/teachers"
            className="rounded-lg border border-brand-400 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            მასწავლებლების ნახვა
          </Link>
        </div>
      </div>
    </section>
  );
}
