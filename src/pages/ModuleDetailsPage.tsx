import { useParams } from "react-router";
import { getModule } from "../api/modules.api";
import { ModuleDetails } from "../components/ModuleDetails/ModuleDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";

export function ModuleDetailsPage() {
  const { id = "" } = useParams();
  const state = useAsync((signal) => getModule(id, signal), [id]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "მოდულები", href: "/modules" },
          { label: state.status === "success" ? state.data.data.name : "..." },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="მოდული ვერ მოიძებნა" description="მოთხოვნილი მოდული არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && <ModuleDetails module={state.data.data} backHref="/modules" />}
    </div>
  );
}
