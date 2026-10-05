import { BookOpen } from "lucide-react";
import { CabinetModuleCard } from "../../components/TeacherCabinet/CabinetModuleCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetModulesPage() {
  const { modules } = useTeacherCabinet().data;
  const totalCredits = modules.reduce((sum, module) => sum + (module.credits ?? 0), 0);

  return (
    <div>
      <CabinetPageHeader
        title="მოდულები"
        description={`${modules.length} მოდული · ჯამში ${totalCredits} კრედიტი`}
      />

      {modules.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <CabinetModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <EmptyState title="მოდულები არ არის მიბმული" icon={<BookOpen className="size-6" aria-hidden="true" />} />
      )}
    </div>
  );
}
