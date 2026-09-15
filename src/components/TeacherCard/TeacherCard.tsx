import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { TeacherCardProps } from "../../types/teacher.types";

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <EntityCardShell
      title={`${teacher.first_name} ${teacher.last_name}`}
      to={`/teachers/${teacher.id}`}
      meta={[
        { label: "ელ-ფოსტა", value: teacher.email },
        { label: "სპეციალობა", value: teacher.specialization },
      ]}
    />
  );
}
