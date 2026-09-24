import { CollegeAvatars } from "../CollegeAvatars/CollegeAvatars";
import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import { getStudentInitials } from "../StudentPhoto/StudentPhoto";
import type { StudentCardProps } from "../../types/student.types";
import "./StudentCard.css";

export function StudentCard({ student }: StudentCardProps) {
  const fullName = `${student.first_name} ${student.last_name}`;

  return (
    <EntityCardShell
      title={fullName}
      to={`/students/${student.id}`}
      accentClassName="student-card"
      media={
        <div className="student-card__photo">
          {student.image ? (
            <img src={student.image} alt={fullName} className="student-card__photo-img" loading="lazy" />
          ) : (
            <div className="student-card__photo-fallback" aria-hidden="true">
              <span className="student-card__initials">{getStudentInitials(student)}</span>
            </div>
          )}
        </div>
      }
      meta={[
        { label: "ელ-ფოსტა", value: student.email },
        { label: "ტელეფონი", value: student.phone },
      ]}
    >
      {student.colleges && student.colleges.length > 0 && <CollegeAvatars colleges={student.colleges} />}
    </EntityCardShell>
  );
}
