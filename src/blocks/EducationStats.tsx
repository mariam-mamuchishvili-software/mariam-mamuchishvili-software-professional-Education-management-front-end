import { Briefcase, Building2, GraduationCap, Layers, Users, Users2 } from "lucide-react";
import { getColleges } from "../api/colleges.api";
import { getGroups } from "../api/groups.api";
import { getModules } from "../api/modules.api";
import { getProfessions } from "../api/professions.api";
import { getStudents } from "../api/students.api";
import { getTeachers } from "../api/teachers.api";
import { useAsync } from "../hooks/useAsync";

const STAT_PARAMS = { skip: 0, limit: 1 };

async function fetchStats(signal: AbortSignal) {
  const [colleges, professions, modules, groups, teachers, students] = await Promise.all([
    getColleges(STAT_PARAMS, signal),
    getProfessions(STAT_PARAMS, signal),
    getModules(STAT_PARAMS, signal),
    getGroups(STAT_PARAMS, signal),
    getTeachers(STAT_PARAMS, signal),
    getStudents(STAT_PARAMS, signal),
  ]);

  return [
    { label: "კოლეჯი", total: colleges.total, icon: Building2 },
    { label: "პროფესია", total: professions.total, icon: Briefcase },
    { label: "მოდული", total: modules.total, icon: Layers },
    { label: "ჯგუფი", total: groups.total, icon: Users2 },
    { label: "მასწავლებელი", total: teachers.total, icon: Users },
    { label: "სტუდენტი", total: students.total, icon: GraduationCap },
  ];
}

export function EducationStats() {
  const state = useAsync(fetchStats, []);

  if (state.status !== "success") return null;

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {state.data.map(({ label, total, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center"
            >
              <Icon className="size-5 text-brand-600" aria-hidden="true" />
              <p className="text-2xl font-bold text-slate-900">{total}</p>
              <p className="text-xs font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
