import { useState } from "react";
import { useParams } from "react-router";
import { getCollege } from "../api/colleges.api";
import { CollegeDetails } from "../components/CollegeDetails/CollegeDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { CollegeInclude } from "../types/college.types";

export function CollegeDetailsPage() {
  const { id = "" } = useParams();
  const [selectedIncludes, setSelectedIncludes] = useState<CollegeInclude[]>([]);
  const state = useAsync(
    (signal) => getCollege(id, selectedIncludes, signal),
    [id, selectedIncludes.join(",")],
  );

  function toggleInclude(include: CollegeInclude) {
    setSelectedIncludes((prev) =>
      prev.includes(include) ? prev.filter((item) => item !== include) : [...prev, include],
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "კოლეჯები", href: "/colleges" },
          { label: state.status === "success" ? state.data.data.name : "..." },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="კოლეჯი ვერ მოიძებნა" description="მოთხოვნილი კოლეჯი არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && (
        <CollegeDetails
          college={state.data.data}
          backHref="/colleges"
          selectedIncludes={selectedIncludes}
          onToggleInclude={toggleInclude}
        />
      )}
    </div>
  );
}
