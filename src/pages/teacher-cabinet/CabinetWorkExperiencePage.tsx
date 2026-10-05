import { Briefcase } from "lucide-react";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { DemoDataNotice } from "../../components/TeacherCabinet/DemoDataNotice";
import { WorkExperienceTimeline } from "../../components/TeacherCabinet/WorkExperienceTimeline";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetWorkExperiencePage() {
  const { workExperiences } = useTeacherCabinet().data;

  return (
    <div className="mx-auto max-w-4xl">
      <CabinetPageHeader title="სამუშაო გამოცდილება" description="თქვენი პროფესიული გზა ქრონოლოგიურად." />
      <DemoDataNotice />

      {workExperiences.length > 0 ? (
        <WorkExperienceTimeline items={workExperiences} />
      ) : (
        <EmptyState
          title="სამუშაო გამოცდილება არ არის დამატებული"
          icon={<Briefcase className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}
