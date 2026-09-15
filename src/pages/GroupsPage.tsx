import { getGroups } from "../api/groups.api";
import { GroupCard } from "../components/GroupCard/GroupCard";
import { useAsync } from "../hooks/useAsync";
import { usePagination } from "../hooks/usePagination";
import { EmptyState } from "../partials/EmptyState";
import { ErrorState } from "../partials/ErrorState";
import { LoadingState } from "../partials/LoadingState";
import { PageHeader } from "../partials/PageHeader";
import { Pagination } from "../partials/Pagination";

export function GroupsPage() {
  const { skip, limit, page, setPage } = usePagination();
  const state = useAsync((signal) => getGroups({ skip, limit }, signal), [skip, limit]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader title="ჯგუფები" description="პროფესიების ფარგლებში დაკომპლექტებული სასწავლო ჯგუფების სია." />

      {state.status === "loading" && <LoadingState />}
      {state.status === "error" && <ErrorState message={state.error} />}
      {state.status === "success" && (
        <>
          {state.data.data.length === 0 ? (
            <EmptyState title="ჯგუფები არ მოიძებნა" description="ამ ეტაპზე ჯგუფები ჯერ არ არის დამატებული." />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.data.map((group) => (
                <GroupCard key={group.id} group={group} />
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
