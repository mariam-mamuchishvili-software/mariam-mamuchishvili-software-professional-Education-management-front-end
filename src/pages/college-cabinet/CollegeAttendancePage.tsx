import { CalendarCheck, X } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getCollegeAttendance, getCollegeGroups } from "../../api/collegeCabinet.api";
import { fetchAllPages } from "../../api/studentCabinet.api";
import { AsyncContent } from "../../components/CollegeCabinet/AsyncContent";
import { INPUT } from "../../components/StudentCabinet/CabinetForm";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { ATTENDANCE_STATUS_LABELS, COLLEGE_CABINET_BASE } from "../../constants/collegeCabinet";
import { useAsync } from "../../hooks/useAsync";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";
import { usePagination } from "../../hooks/usePagination";
import { EmptyState } from "../../partials/EmptyState";
import { Pagination } from "../../partials/Pagination";
import type { AttendanceFilters, AttendanceStatus } from "../../types/collegeCabinet.types";
import { formatDate } from "../../utils/formatDate";

const PAGE_SIZE = 25;

// Class names are spelled out in full per status so Tailwind can detect them.
const STATUS_CLASSES: Record<AttendanceStatus, string> = {
  present:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  late: "bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
  excused: "bg-sky-50 text-sky-700 ring-sky-600/15 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
  absent: "bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
};

const FILTER_KEYS = ["group_id", "student_id", "from", "until"] as const;

function positiveInt(value: string | null): number | undefined {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
}

/** Attendance marks of the college, filtered by group, student and date range via the URL. */
export function CollegeAttendancePage() {
  const { token } = useCollegeCabinet();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, skip, setPage } = usePagination(PAGE_SIZE);
  const [reloadKey, setReloadKey] = useState(0);

  const filters: AttendanceFilters = {
    group_id: positiveInt(searchParams.get("group_id")),
    student_id: positiveInt(searchParams.get("student_id")),
    from: searchParams.get("from") || undefined,
    until: searchParams.get("until") || undefined,
  };
  const hasFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  const groups = useAsync(
    (signal) => fetchAllPages((params, pageSignal) => getCollegeGroups(token, params, pageSignal), signal),
    [token],
  );
  const state = useAsync(
    (signal) => getCollegeAttendance(token, { ...filters, skip, limit }, signal),
    [token, filters.group_id, filters.student_id, filters.from, filters.until, skip, limit, reloadKey],
  );

  function setFilter(key: (typeof FILTER_KEYS)[number], value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      return next;
    });
  }

  function clearFilters() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const key of [...FILTER_KEYS, "page"]) next.delete(key);
      return next;
    });
  }

  return (
    <div>
      <CabinetPageHeader
        title="დასწრება"
        description={state.status === "success" ? `${state.data.total} ჩანაწერი` : "სტუდენტების დასწრების ჟურნალი."}
      />

      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label
            htmlFor="attendance-group"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            ჯგუფი
          </label>
          <select
            id="attendance-group"
            className={INPUT}
            value={filters.group_id ?? ""}
            onChange={(event) => setFilter("group_id", event.target.value)}
            disabled={groups.status !== "success"}
          >
            <option value="">ყველა ჯგუფი</option>
            {groups.data?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
                {group.code ? ` (${group.code})` : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="attendance-from"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            თარიღიდან
          </label>
          <input
            id="attendance-from"
            type="date"
            className={INPUT}
            value={filters.from ?? ""}
            max={filters.until}
            onChange={(event) => setFilter("from", event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="attendance-until"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            თარიღამდე
          </label>
          <input
            id="attendance-until"
            type="date"
            className={INPUT}
            value={filters.until ?? ""}
            min={filters.from}
            onChange={(event) => setFilter("until", event.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <X className="size-4" aria-hidden="true" />
            ფილტრის გასუფთავება
          </button>
        </div>
        {filters.student_id && (
          <p className="text-sm text-slate-500 sm:col-span-2 lg:col-span-4 dark:text-slate-400">
            ნაჩვენებია ერთი სტუდენტის დასწრება.{" "}
            <button
              type="button"
              onClick={() => setFilter("student_id", "")}
              className="font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              ყველა სტუდენტის ჩვენება
            </button>
          </p>
        )}
      </div>

      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
        {({ data, total }) =>
          data.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full min-w-2xl text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        თარიღი
                      </th>
                      <th scope="col" className="px-4 py-3">
                        სტუდენტი
                      </th>
                      <th scope="col" className="px-4 py-3">
                        ჯგუფი
                      </th>
                      <th scope="col" className="px-4 py-3">
                        პედაგოგი
                      </th>
                      <th scope="col" className="px-4 py-3">
                        სტატუსი
                      </th>
                      <th scope="col" className="px-4 py-3">
                        შენიშვნა
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.map((item) => (
                      <tr key={item.id} className="text-slate-700 dark:text-slate-300">
                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.date)}</td>
                        <td className="px-4 py-3">
                          <Link
                            to={`${COLLEGE_CABINET_BASE}/students/${item.student_id}`}
                            className="font-medium text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                          >
                            {item.student_name ?? `#${item.student_id}`}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`${COLLEGE_CABINET_BASE}/groups/${item.group_id}`}
                            className="hover:text-brand-600 dark:hover:text-brand-400"
                          >
                            {item.group_name ?? `#${item.group_id}`}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{item.teacher_name ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ring-1 ${STATUS_CLASSES[item.status]}`}
                          >
                            {ATTENDANCE_STATUS_LABELS[item.status] ?? item.status}
                          </span>
                        </td>
                        <td
                          className="max-w-56 truncate px-4 py-3 text-slate-500 dark:text-slate-400"
                          title={item.note ?? undefined}
                        >
                          {item.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination page={page} limit={limit} total={total} onPageChange={setPage} />
            </div>
          ) : (
            <EmptyState
              title="ჩანაწერები ვერ მოიძებნა"
              description={hasFilters ? "სცადეთ სხვა ფილტრი." : "დასწრება ჯერ არ არის აღრიცხული."}
              icon={<CalendarCheck className="size-6" aria-hidden="true" />}
            />
          )
        }
      </AsyncContent>
    </div>
  );
}
