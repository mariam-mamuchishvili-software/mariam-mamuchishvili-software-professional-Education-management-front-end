import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { StudentCardProps } from "../../types/student.types";
import "./StudentCard.css";

export function StudentCard({ student }: StudentCardProps) {
  return (
    <EntityCardShell
      title={`${student.first_name} ${student.last_name}`}
      to={`/students/${student.id}`}
      accentClassName="student-card"
      meta={[
        { label: "ელ-ფოსტა", value: student.email },
        { label: "ტელეფონი", value: student.phone },
      ]}
    />
  );
}
