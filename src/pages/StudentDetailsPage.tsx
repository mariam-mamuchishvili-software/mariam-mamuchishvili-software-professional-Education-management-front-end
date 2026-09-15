import { useParams } from "react-router";
import { getStudent } from "../api/students.api";
import { StudentDetails } from "../components/StudentDetails/StudentDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";

export function StudentDetailsPage() {
  const { id = "" } = useParams();
  const state = useAsync((signal) => getStudent(id, signal), [id]);
  const studentName =
    state.status === "success" ? `${state.data.data.first_name} ${state.data.data.last_name}` : "...";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "სტუდენტები", href: "/students" },
          { label: studentName },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="სტუდენტი ვერ მოიძებნა" description="მოთხოვნილი სტუდენტი არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && <StudentDetails student={state.data.data} backHref="/students" />}
    </div>
  );
}
