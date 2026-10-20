import { BookOpen, Briefcase, CompassIcon, GraduationCap, Megaphone, Presentation, UsersRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import type { ApiListResponse } from "../../api/types";
import {
  getCollegeAnnouncements,
  getCollegeGroups,
  getCollegeModules,
  getCollegeProfessions,
  getCollegeStudents,
  getCollegeTeachers,
} from "../../api/collegeCabinet.api";
import type { ListParams } from "../../api/client";
import { AsyncContent } from "../../components/CollegeCabinet/AsyncContent";
import {
  AnnouncementCard,
  CollegeGroupCard,
  CollegeModuleCard,
  CollegeProfessionCard,
  CollegeStudentCard,
  CollegeTeacherCard,
} from "../../components/CollegeCabinet/CollegeCabinetCards";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { AUDIENCE_LABELS, COLLEGE_CABINET_BASE } from "../../constants/collegeCabinet";
import { useAsync } from "../../hooks/useAsync";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";
import { usePagination } from "../../hooks/usePagination";
import { EmptyState } from "../../partials/EmptyState";
import { Pagination } from "../../partials/Pagination";
import type { AnnouncementAudience } from "../../types/collegeCabinet.types";

const GRID = "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3";
const PAGE_SIZE = 12;

interface PagedListProps<T> {
  title: string;
  /** Builds the description from the total. */
  describe: (total: number) => string;
  fetchPage: (token: string, params: ListParams, signal: AbortSignal) => Promise<ApiListResponse<T>>;
  renderItem: (item: T) => ReactNode;
  empty: ReactNode;
}

/** A paginated cabinet list; the page number lives in the `page` query param. */
function PagedList<T extends { id: number }>({ title, describe, fetchPage, renderItem, empty }: PagedListProps<T>) {
  const { token } = useCollegeCabinet();
  const { page, limit, skip, setPage } = usePagination(PAGE_SIZE);
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => fetchPage(token, { skip, limit }, signal), [token, skip, limit, reloadKey]);

  return (
    <div>
      <CabinetPageHeader
        title={title}
        description={state.status === "success" ? describe(state.data.total) : undefined}
      />

      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
        {({ data, total }) =>
          data.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className={GRID}>
                {data.map((item) => (
                  <div key={item.id} className="flex min-w-0 flex-col *:flex-1">
                    {renderItem(item)}
                  </div>
                ))}
              </div>
              <Pagination page={page} limit={limit} total={total} onPageChange={setPage} />
            </div>
          ) : (
            empty
          )
        }
      </AsyncContent>
    </div>
  );
}

export function CollegeStudentsPage() {
  return (
    <PagedList
      title="სტუდენტები"
      describe={(total) => `კოლეჯში ჩარიცხულია ${total} სტუდენტი.`}
      fetchPage={getCollegeStudents}
      renderItem={(student) => <CollegeStudentCard student={student} />}
      empty={
        <EmptyState
          title="სტუდენტები არ არის"
          description="სტუდენტები ემატება კოლეჯის მართვის პანელიდან."
          icon={<GraduationCap className="size-6" aria-hidden="true" />}
        />
      }
    />
  );
}

export function CollegeTeachersPage() {
  return (
    <PagedList
      title="პედაგოგები"
      describe={(total) => `კოლეჯში მუშაობს ${total} პედაგოგი.`}
      fetchPage={getCollegeTeachers}
      renderItem={(teacher) => <CollegeTeacherCard teacher={teacher} />}
      empty={
        <EmptyState
          title="პედაგოგები არ არის"
          description="პედაგოგები ემატება კოლეჯის მართვის პანელიდან."
          icon={<Presentation className="size-6" aria-hidden="true" />}
        />
      }
    />
  );
}

export function CollegeGroupsPage() {
  return (
    <PagedList
      title="ჯგუფები"
      describe={(total) => `კოლეჯის ${total} ჯგუფი.`}
      fetchPage={getCollegeGroups}
      renderItem={(group) => <CollegeGroupCard group={group} />}
      empty={
        <EmptyState
          title="ჯგუფები არ არის"
          description="ჯგუფები იქმნება კოლეჯის მართვის პანელიდან."
          icon={<UsersRound className="size-6" aria-hidden="true" />}
        />
      }
    />
  );
}

export function CollegeProfessionsPage() {
  const { token } = useCollegeCabinet();
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => getCollegeProfessions(token, signal), [token, reloadKey]);

  return (
    <div>
      <CabinetPageHeader
        title="პროფესიები"
        description={state.status === "success" ? `კოლეჯში ისწავლება ${state.data.length} პროფესია.` : undefined}
      />
      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
        {(professions) =>
          professions.length > 0 ? (
            <div className={GRID}>
              {professions.map((profession) => (
                <CollegeProfessionCard key={profession.id} profession={profession} />
              ))}
            </div>
          ) : (
            <EmptyState title="პროფესიები არ არის" icon={<Briefcase className="size-6" aria-hidden="true" />} />
          )
        }
      </AsyncContent>
    </div>
  );
}

export function CollegeModulesPage() {
  const { token } = useCollegeCabinet();
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => getCollegeModules(token, signal), [token, reloadKey]);

  return (
    <div>
      <CabinetPageHeader
        title="მოდულები"
        description={
          state.status === "success"
            ? `${state.data.length} მოდული · ჯამში ${state.data.reduce((sum, module) => sum + (module.credits ?? 0), 0)} კრედიტი`
            : undefined
        }
      />
      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
        {(modules) =>
          modules.length > 0 ? (
            <div className={GRID}>
              {modules.map((module) => (
                <CollegeModuleCard key={module.id} module={module} />
              ))}
            </div>
          ) : (
            <EmptyState title="მოდულები არ არის" icon={<BookOpen className="size-6" aria-hidden="true" />} />
          )
        }
      </AsyncContent>
    </div>
  );
}

type AudienceFilter = AnnouncementAudience | "all";

const AUDIENCE_FILTERS: { value: AudienceFilter; label: string }[] = [
  { value: "all", label: "ყველა" },
  ...(Object.entries(AUDIENCE_LABELS) as [AnnouncementAudience, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

export function CollegeAnnouncementsPage() {
  const { token } = useCollegeCabinet();
  const [reloadKey, setReloadKey] = useState(0);
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const state = useAsync((signal) => getCollegeAnnouncements(token, signal), [token, reloadKey]);

  return (
    <div>
      <CabinetPageHeader title="განცხადებები" description="კოლეჯის განცხადებები, მონახაზების ჩათვლით." />

      <div role="group" aria-label="აუდიტორია" className="mb-5 flex flex-wrap gap-2">
        {AUDIENCE_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setAudience(value)}
            aria-pressed={audience === value}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              audience === value
                ? "bg-brand-600 text-white dark:bg-brand-500"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)}>
        {(announcements) => {
          // "everyone" announcements reach teachers and students alike.
          const shown =
            audience === "all"
              ? announcements
              : announcements.filter((item) => item.audience === audience || item.audience === "everyone");

          return shown.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {shown.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          ) : (
            <EmptyState title="განცხადებები არ არის" icon={<Megaphone className="size-6" aria-hidden="true" />} />
          );
        }}
      </AsyncContent>
    </div>
  );
}

export function CollegeCabinetNotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <CompassIcon className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
      <h2 className="mt-2 text-2xl font-bold">გვერდი ვერ მოიძებნა</h2>
      <p className="mt-3 text-slate-500 dark:text-slate-400">კაბინეტში ასეთი განყოფილება არ არსებობს.</p>
      <Link
        to={COLLEGE_CABINET_BASE}
        className="mt-8 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        დაფაზე დაბრუნება
      </Link>
    </div>
  );
}
