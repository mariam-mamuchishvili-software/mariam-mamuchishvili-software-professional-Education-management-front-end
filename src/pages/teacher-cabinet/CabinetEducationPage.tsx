import { GraduationCap } from "lucide-react";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { DemoDataNotice } from "../../components/TeacherCabinet/DemoDataNotice";
import { EducationTimeline } from "../../components/TeacherCabinet/EducationTimeline";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetEducationPage() {
  const { educations } = useTeacherCabinet().data;

  return (
    <div className="mx-auto max-w-4xl">
      <CabinetPageHeader title="განათლება" description="აკადემიური ხარისხები და სპეციალიზაციები." />
      <DemoDataNotice />

      {educations.length > 0 ? (
        <EducationTimeline items={educations} />
      ) : (
        <EmptyState title="განათლება არ არის დამატებული" icon={<GraduationCap className="size-6" aria-hidden="true" />} />
      )}
    </div>
  );
}
