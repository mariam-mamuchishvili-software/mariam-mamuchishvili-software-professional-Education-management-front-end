import { getStudents } from "../api/students.api";
import { StudentCard } from "../components/StudentCard/StudentCard";
import { useAsync } from "../hooks/useAsync";
import { usePagination } from "../hooks/usePagination";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import { PageHeader } from "../partials/PageHeader";
import { Pagination } from "../partials/Pagination";

export function StudentsPage() {
  const { skip, limit, page, setPage } = usePagination();
  const state = useAsync((signal) => getStudents({ skip, limit }, signal), [skip, limit]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="სტუდენტები"
        description="სასწავლო ჯგუფებში ჩართული სტუდენტების სია."
        backHref="/"
        accent="rose"
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" && <ErrorState message={state.error} />}
      {state.status === "success" && (
        <>
          {state.data.data.length === 0 ? (
            <EmptyState title="სტუდენტები არ მოიძებნა" description="ამ ეტაპზე სტუდენტები ჯერ არ არის დამატებული." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.data.map((student) => (
                <StudentCard key={student.id} student={student} />
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
