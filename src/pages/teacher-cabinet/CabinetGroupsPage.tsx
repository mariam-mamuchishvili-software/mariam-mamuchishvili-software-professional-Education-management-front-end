import { UsersRound } from "lucide-react";
import { CabinetGroupCard } from "../../components/TeacherCabinet/CabinetGroupCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useTeacherCabinet } from "../../hooks/useTeacherCabinet";
import { EmptyState } from "../../partials/EmptyState";

export function CabinetGroupsPage() {
  const { groups } = useTeacherCabinet().data;

  return (
    <div>
      <CabinetPageHeader
        title="ჯგუფები"
        description="ჯგუფები, რომელთა პროფესიებშიც თქვენი მოდულები ისწავლება."
      />

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <CabinetGroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="ჯგუფები ვერ მოიძებნა"
          description="ჯგუფები გამოჩნდება, როცა თქვენს მოდულებს პროფესია და ჯგუფი მიებმება."
          icon={<UsersRound className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}
