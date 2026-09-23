import { getColleges } from "../api/colleges.api";
import { CollegeCard } from "../components/CollegeCard/CollegeCard";
import { useAsync } from "../hooks/useAsync";
import { usePagination } from "../hooks/usePagination";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import { PageHeader } from "../partials/PageHeader";
import { Pagination } from "../partials/Pagination";

export function CollegesPage() {
  const { skip, limit, page, setPage } = usePagination();
  const state = useAsync((signal) => getColleges({ skip, limit }, signal), [skip, limit]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="კოლეჯები"
        description="პლატფორმაზე დარეგისტრირებული საგანმანათლებლო კოლეჯების სია."
        backHref="/"
        accent="indigo"
      />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" && <ErrorState message={state.error} />}
      {state.status === "success" && (
        <>
          {state.data.data.length === 0 ? (
            <EmptyState title="კოლეჯები არ მოიძებნა" description="ამ ეტაპზე კოლეჯები ჯერ არ არის დამატებული." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.data.map((college) => (
                <CollegeCard key={college.id} college={college} />
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
