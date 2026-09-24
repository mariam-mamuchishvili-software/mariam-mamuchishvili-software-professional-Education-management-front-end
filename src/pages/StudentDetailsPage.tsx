import { useState } from "react";
import { useParams } from "react-router";
import { getStudent } from "../api/students.api";
import { StudentDetails } from "../components/StudentDetails/StudentDetails";
import { useAsync } from "../hooks/useAsync";
import { useRetainedItem } from "../hooks/useRetainedItem";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import type { StudentToggleInclude } from "../types/student.types";

export function StudentDetailsPage() {
  const { id = "" } = useParams();
  const [selectedIncludes, setSelectedIncludes] = useState<StudentToggleInclude[]>([]);
  const state = useAsync(
    (signal) => getStudent(id, ["colleges", ...selectedIncludes], signal),
    [id, selectedIncludes.join(",")],
  );
  const { item: student, isRefreshing } = useRetainedItem(state.data?.data, state.status === "loading", id);

  function toggleInclude(include: StudentToggleInclude) {
    setSelectedIncludes((prev) =>
      prev.includes(include) ? prev.filter((item) => item !== include) : [...prev, include],
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "სტუდენტები", href: "/students" },
          { label: student ? `${student.first_name} ${student.last_name}` : "..." },
        ]}
      />

      {state.status === "loading" && !student && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="სტუდენტი ვერ მოიძებნა" description="მოთხოვნილი სტუდენტი არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {student && (
        <div aria-busy={isRefreshing} className={`transition-opacity ${isRefreshing ? "opacity-70" : ""}`}>
          <StudentDetails
            student={student}
            backHref="/students"
            selectedIncludes={selectedIncludes}
            onToggleInclude={toggleInclude}
          />
        </div>
      )}
    </div>
  );
}
