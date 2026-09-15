import { useParams } from "react-router";
import { getTeacher } from "../api/teachers.api";
import { TeacherDetails } from "../components/TeacherDetails/TeacherDetails";
import { useAsync } from "../hooks/useAsync";
import { Breadcrumbs } from "../partials/Breadcrumbs";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";

export function TeacherDetailsPage() {
  const { id = "" } = useParams();
  const state = useAsync((signal) => getTeacher(id, signal), [id]);
  const teacherName =
    state.status === "success" ? `${state.data.data.first_name} ${state.data.data.last_name}` : "...";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "მთავარი", href: "/" },
          { label: "მასწავლებლები", href: "/teachers" },
          { label: teacherName },
        ]}
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" &&
        (state.errorStatus === 404 ? (
          <EmptyState title="მასწავლებელი ვერ მოიძებნა" description="მოთხოვნილი მასწავლებელი არ არსებობს ან წაშლილია." />
        ) : (
          <ErrorState message={state.error} />
        ))}
      {state.status === "success" && <TeacherDetails teacher={state.data.data} backHref="/teachers" />}
    </div>
  );
}
