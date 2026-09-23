import { useState } from "react";
import { useParams } from "react-router";
import { getProfession } from "../api/professions.api";
import { ProfessionDetails } from "../components/ProfessionDetails/ProfessionDetails";
import { useAsync } from "../hooks/useAsync";
import { useRetainedItem } from "../hooks/useRetainedItem";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { ProfessionInclude } from "../types/profession.types";

export function ProfessionDetailsPage() {
  const { id = "" } = useParams();
  const [selectedIncludes, setSelectedIncludes] = useState<ProfessionInclude[]>([]);
  const state = useAsync(
    (signal) => getProfession(id, selectedIncludes, signal),
    [id, selectedIncludes.join(",")],
  );

  const { item: profession, isRefreshing } = useRetainedItem(state.data?.data, state.status === "loading", id);

  function toggleInclude(include: ProfessionInclude) {
    setSelectedIncludes((prev) =>
      prev.includes(include) ? prev.filter((item) => item !== include) : [...prev, include],
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "პროფესიები", href: "/professions" },
          { label: profession ? profession.name : "..." },
        ]}
      />

      {state.status === "loading" && !profession && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="პროფესია ვერ მოიძებნა" description="მოთხოვნილი პროფესია არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {profession && (
        <div aria-busy={isRefreshing} className={`transition-opacity ${isRefreshing ? "opacity-70" : ""}`}>
          <ProfessionDetails
            profession={profession}
            backHref="/professions"
            selectedIncludes={selectedIncludes}
            onToggleInclude={toggleInclude}
          />
        </div>
      )}
    </div>
  );
}
