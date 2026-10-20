import { Briefcase, CalendarCheck, GraduationCap, Presentation, UsersRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { getCollegeReport } from "../../api/collegeCabinet.api";
import { AsyncContent } from "../../components/CollegeCabinet/AsyncContent";
import { GroupStatusBadge, ProgressBar } from "../../components/CollegeCabinet/CollegeCabinetCards";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { GROUP_STATUS_BY_LABEL } from "../../constants/collegeCabinet";
import { useAsync } from "../../hooks/useAsync";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";

function Empty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-slate-500 dark:text-slate-400">{children}</p>;
}

/** Label, value and a bar scaled to `max`. */
function BarRow({
  label,
  hint,
  value,
  max,
  display,
  capacity,
}: {
  label: string;
  hint?: ReactNode;
  value: number;
  max: number;
  display?: string;
  /** Colour the bar as a fill level (amber near full, rose over capacity). */
  capacity?: boolean;
}) {
  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="min-w-0 truncate font-medium text-slate-800 first-letter:uppercase dark:text-slate-100">
          {label}
          {hint && <span className="ml-1.5 text-xs font-normal text-slate-500 dark:text-slate-400">{hint}</span>}
        </span>
        <span className="shrink-0 font-semibold text-slate-700 tabular-nums dark:text-slate-200">
          {display ?? value}
        </span>
      </div>
      <ProgressBar percent={max > 0 ? (value / max) * 100 : 0} label={label} capacity={capacity} />
    </li>
  );
}

function Stat({ label, value, tone }: { label: string; value: ReactNode; tone: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-3 text-center dark:bg-slate-800/50">
      <p className={`text-2xl font-bold tracking-tight tabular-nums ${tone}`}>{value}</p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

/** The college's statistics (CollegeReport on the backend), one panel per report. */
export function CollegeReportsPage() {
  const { token } = useCollegeCabinet();
  const [reloadKey, setReloadKey] = useState(0);
  const state = useAsync((signal) => getCollegeReport(token, signal), [token, reloadKey]);

  return (
    <div>
      <CabinetPageHeader title="ანგარიშები" description="კოლეჯის სტატისტიკა რეალურ დროში." />

      <AsyncContent state={state} onRetry={() => setReloadKey((key) => key + 1)} loadingLabel="ანგარიში მზადდება...">
        {(report) => {
          const { completion } = report;
          const maxStudents = Math.max(0, ...report.students_by_profession.map((row) => row.students));
          const maxModules = Math.max(0, ...report.teacher_distribution.map((row) => row.modules));

          return (
            <div className="flex flex-col gap-6">
              <CabinetCard title="სწავლის დასრულება" description="სტუდენტების ჩარიცხვის სტატუსები" icon={GraduationCap}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat label="სწავლობს" value={completion.studying} tone="text-brand-600 dark:text-brand-400" />
                  <Stat label="დაამთავრა" value={completion.graduated} tone="text-emerald-600 dark:text-emerald-400" />
                  <Stat label="შეწყვიტა" value={completion.withdrawn} tone="text-rose-600 dark:text-rose-400" />
                  <Stat
                    label="დამთავრების მაჩვენებელი"
                    value={completion.graduation_rate_percent != null ? `${completion.graduation_rate_percent}%` : "—"}
                    tone="text-slate-900 dark:text-white"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  დამთავრების მაჩვენებელი ითვლება მათგან, ვინც სწავლა დაასრულა ან შეწყვიტა.
                </p>
              </CabinetCard>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <CabinetCard title="სტუდენტები პროფესიების მიხედვით" icon={Briefcase}>
                  {report.students_by_profession.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {report.students_by_profession.map((row) => (
                        <BarRow
                          key={row.profession}
                          label={row.profession}
                          hint={`${row.groups} ჯგუფი`}
                          value={row.students}
                          max={maxStudents}
                        />
                      ))}
                    </ul>
                  ) : (
                    <Empty>პროფესიები არ არის.</Empty>
                  )}
                </CabinetCard>

                <CabinetCard title="პედაგოგების დატვირთვა" description="მოდულების რაოდენობა" icon={Presentation}>
                  {report.teacher_distribution.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {report.teacher_distribution.map((row) => (
                        <BarRow
                          key={row.teacher}
                          label={row.teacher}
                          hint={row.specialization ?? undefined}
                          value={row.modules}
                          max={maxModules}
                        />
                      ))}
                    </ul>
                  ) : (
                    <Empty>პედაგოგები არ არის.</Empty>
                  )}
                </CabinetCard>

                <CabinetCard title="ჯგუფების შევსებულობა" description="სტუდენტები ტევადობასთან" icon={UsersRound}>
                  {report.group_load.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {report.group_load.map((row) => {
                        const status = GROUP_STATUS_BY_LABEL[row.status];
                        return (
                          <BarRow
                            key={row.code || row.group}
                            label={row.group}
                            hint={status ? <GroupStatusBadge status={status} /> : row.status}
                            value={row.fill_percent}
                            max={100}
                            display={`${row.students} / ${row.capacity} · ${row.fill_percent}%`}
                            capacity
                          />
                        );
                      })}
                    </ul>
                  ) : (
                    <Empty>ჯგუფები არ არის.</Empty>
                  )}
                </CabinetCard>

                <CabinetCard title="დასწრება ჯგუფების მიხედვით" description="დაესწრო ან დააგვიანა" icon={CalendarCheck}>
                  {report.attendance_by_group.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {report.attendance_by_group.map((row) => (
                        <BarRow
                          key={row.group}
                          label={row.group}
                          hint={`${row.marks} ჩანაწერი`}
                          value={row.attendance_percent ?? 0}
                          max={100}
                          display={row.attendance_percent != null ? `${row.attendance_percent}%` : "—"}
                        />
                      ))}
                    </ul>
                  ) : (
                    <Empty>დასწრება ჯერ არ არის აღრიცხული.</Empty>
                  )}
                </CabinetCard>
              </div>
            </div>
          );
        }}
      </AsyncContent>
    </div>
  );
}
