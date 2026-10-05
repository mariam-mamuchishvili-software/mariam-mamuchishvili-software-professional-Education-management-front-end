import { Search, Users } from "lucide-react";
import { useState } from "react";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { CabinetStudentCard } from "../../components/TeacherCabinet/CabinetStudentCard";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetStudentsPage() {
  const { students } = useTeacherCabinet().data;
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? students.filter((student) =>
        `${student.first_name} ${student.last_name} ${student.email}`.toLowerCase().includes(needle),
      )
    : students;

  return (
    <div>
      <CabinetPageHeader
        title="სტუდენტები"
        description={`${students.length} სტუდენტი თქვენს მოდულებზე`}
        action={
          students.length > 0 && (
            <label className="relative block w-full sm:w-72">
              <span className="sr-only">სტუდენტის ძებნა</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ძებნა სახელით ან ელ-ფოსტით"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </label>
          )
        }
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((student) => (
            <CabinetStudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={students.length > 0 ? "შედეგი ვერ მოიძებნა" : "სტუდენტები ვერ მოიძებნა"}
          description={students.length > 0 ? "სცადეთ სხვა საძიებო სიტყვა." : undefined}
          icon={<Users className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}
