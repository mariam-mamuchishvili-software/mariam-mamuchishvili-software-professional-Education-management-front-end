import { Award } from "lucide-react";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { CabinetTrainingCard } from "../../components/TeacherCabinet/CabinetTrainingCard";
import { DemoDataNotice } from "../../components/TeacherCabinet/DemoDataNotice";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetTrainingPage() {
  const { trainings } = useTeacherCabinet().data;
  const sorted = [...trainings].sort((a, b) => (b.issue_date ?? "").localeCompare(a.issue_date ?? ""));

  return (
    <div>
      <CabinetPageHeader
        title="ტრენინგები და სერტიფიკატები"
        description={`${trainings.length} გავლილი ტრენინგი`}
      />
      <DemoDataNotice />

      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((training) => (
            <CabinetTrainingCard key={training.id} training={training} />
          ))}
        </div>
      ) : (
        <EmptyState title="ტრენინგები არ არის დამატებული" icon={<Award className="size-6" aria-hidden="true" />} />
      )}
    </div>
  );
}
