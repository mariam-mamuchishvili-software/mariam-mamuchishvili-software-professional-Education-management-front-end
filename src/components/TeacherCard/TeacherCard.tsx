import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { TeacherCardProps } from "../../types/teacher.types";
import "./TeacherCard.css";

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <EntityCardShell
      title={`${teacher.first_name} ${teacher.last_name}`}
      to={`/teachers/${teacher.id}`}
      accentClassName="teacher-card"
      meta={[
        { label: "ელ-ფოსტა", value: teacher.email },
        { label: "სპეციალობა", value: teacher.specialization },
      ]}
    />
  );
}
