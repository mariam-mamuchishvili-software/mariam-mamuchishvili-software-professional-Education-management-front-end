import { useState } from "react";
import { useParams } from "react-router";
import { getGroup } from "../api/groups.api";
import { GroupDetails } from "../components/GroupDetails/GroupDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { GroupInclude } from "../types/group.types";

export function GroupDetailsPage() {
  const { id = "" } = useParams();
  const [selectedIncludes, setSelectedIncludes] = useState<GroupInclude[]>([]);
  const state = useAsync(
    (signal) => getGroup(id, selectedIncludes, signal),
    [id, selectedIncludes.join(",")],
  );

  function toggleInclude(include: GroupInclude) {
    setSelectedIncludes((prev) =>
      prev.includes(include) ? prev.filter((item) => item !== include) : [...prev, include],
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "ჯგუფები", href: "/groups" },
          { label: state.status === "success" ? state.data.data.name : "..." },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="ჯგუფი ვერ მოიძებნა" description="მოთხოვნილი ჯგუფი არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && (
        <GroupDetails
          group={state.data.data}
          backHref="/groups"
          selectedIncludes={selectedIncludes}
          onToggleInclude={toggleInclude}
        />
      )}
    </div>
  );
}
