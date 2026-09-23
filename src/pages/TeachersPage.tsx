import { getTeachers } from "../api/teachers.api";
import { TeacherCard } from "../components/TeacherCard/TeacherCard";
import { useAsync } from "../hooks/useAsync";
import { usePagination } from "../hooks/usePagination";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import { PageHeader } from "../partials/PageHeader";
import { Pagination } from "../partials/Pagination";

export function TeachersPage() {
  const { skip, limit, page, setPage } = usePagination();
  const state = useAsync((signal) => getTeachers({ skip, limit }, signal), [skip, limit]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="მასწავლებლები"
        description="კოლეჯებსა და მოდულებზე მიბმული მასწავლებლების სია."
        backHref="/"
        accent="violet"
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" && <ErrorState message={state.error} />}
      {state.status === "success" && (
        <>
          {state.data.data.length === 0 ? (
            <EmptyState title="მასწავლებლები არ მოიძებნა" description="ამ ეტაპზე მასწავლებლები ჯერ არ არის დამატებული." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.data.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Pagination page={page} limit={limit} total={state.data.total} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  );
}
