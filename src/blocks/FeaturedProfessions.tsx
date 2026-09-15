import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { getProfessions } from "../api/professions.api";
import { CardCarousel } from "../components/CardCarousel/CardCarousel";
import { ProfessionCard } from "../components/ProfessionCard/ProfessionCard";
import { useAsync } from "../hooks/useAsync";
import { LoadingState } from "../partials/LoadingState";

export function FeaturedProfessions() {
  const state = useAsync((signal) => getProfessions({ skip: 0, limit: 6 }, signal), []);

  if (state.status === "loading") return <LoadingState label="პროფესიები იტვირთება..." />;
  if (state.status === "error" || state.data.data.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">პროფესიები</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">აირჩიეთ თქვენთვის საინტერესო პროფესიული პროგრამა.</p>
          </div>
          <Link
            to="/professions"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400 sm:flex"
          >
            ყველას ნახვა
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <CardCarousel>
          {state.data.data.map((profession) => (
            <ProfessionCard key={profession.id} profession={profession} />
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
