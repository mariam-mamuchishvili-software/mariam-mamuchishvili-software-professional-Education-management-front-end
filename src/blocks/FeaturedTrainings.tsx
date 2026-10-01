import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import { useEffect } from "react";
import { getTrainings } from "../api/trainings.api";
import { CardCarousel } from "../components/CardCarousel/CardCarousel";
import { TrainingCard } from "../components/TrainingCard/TrainingCard";
import { useAsync } from "../hooks/useAsync";
import { LoadingState } from "../partials/LoadingState";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FANCYBOX_SELECTOR = '[data-fancybox="training-videos"]';

export function FeaturedTrainings() {
  const state = useAsync((signal) => getTrainings({ skip: 0, limit: 6 }, signal), []);

  useEffect(() => {
    if (state.status !== "success") return;

    Fancybox.bind(FANCYBOX_SELECTOR, {
      groupAll: true,
    });

    return () => {
      Fancybox.unbind(FANCYBOX_SELECTOR);
    };
  }, [state.status]);

  if (state.status === "loading") return <LoadingState label="ტრენინგები იტვირთება..." />;
  if (state.status === "error" || state.data.data.length === 0) return null;

  return (
    <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">ტრენინგები</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">პლატფორმაზე არსებული ტრენინგები და მათი პრეზენტერები.</p>
      </div>

      <CardCarousel autoplay autoplayDelay={3500} fullWidth>
        {state.data.data.map((training) => (
          <TrainingCard key={training.id} training={training} />
        ))}
      </CardCarousel>
    </section>
  );
}
