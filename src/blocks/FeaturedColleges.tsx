import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { getColleges } from "../api/colleges.api";
import { CardCarousel } from "../components/CardCarousel/CardCarousel";
import { CollegeCard } from "../components/CollegeCard/CollegeCard";
import { useAsync } from "../hooks/useAsync";
import { LoadingState } from "../partials/LoadingState";

export function FeaturedColleges() {
  const state = useAsync((signal) => getColleges({ skip: 0, limit: 6 }, signal), []);

  if (state.status === "loading") return <LoadingState label="კოლეჯები იტვირთება..." />;
  if (state.status === "error" || state.data.data.length === 0) return null;

  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">კოლეჯები</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">პლატფორმაზე დარეგისტრირებული საგანმანათლებლო კოლეჯები.</p>
        </div>
        <Link
          to="/colleges"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400 sm:flex"
        >
          ყველას ნახვა
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <CardCarousel autoplay autoplayDelay={3500} fullWidth>
        {state.data.data.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </CardCarousel>
    </section>
  );
}
