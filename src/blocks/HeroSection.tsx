import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          განათლების მართვის პლატფორმა
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          კოლეჯები, პროფესიები და ჯგუფები — ერთ სივრცეში
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
          გაეცანით პროფესიულ საგანმანათლებლო ეკოსისტემას: კოლეჯებს, პროფესიებს, სასწავლო
          მოდულებს, ჯგუფებს, მასწავლებლებსა და სტუდენტებს ერთიან პლატფორმაზე.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/professions"
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            პროფესიების დათვალიერება
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/colleges"
            className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            კოლეჯების ნახვა
          </Link>
        </div>
      </div>
    </section>
  );
}
