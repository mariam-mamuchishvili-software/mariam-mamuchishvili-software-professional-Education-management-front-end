import { useParams } from "react-router";
import { getProfession } from "../api/professions.api";
import { ProfessionDetails } from "../components/ProfessionDetails/ProfessionDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";

export function ProfessionDetailsPage() {
  const { id = "" } = useParams();
  const state = useAsync((signal) => getProfession(id, signal), [id]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "პროფესიები", href: "/professions" },
          { label: state.status === "success" ? state.data.data.name : "..." },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="პროფესია ვერ მოიძებნა" description="მოთხოვნილი პროფესია არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && (
        <ProfessionDetails profession={state.data.data} backHref="/professions" />
      )}
    </div>
  );
}
