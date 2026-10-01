import { ArrowRight, Building2, ChevronRight, Mail, Phone, Presentation } from "lucide-react";
import { Link } from "react-router";
import type { TeacherCardProps } from "../../types/teacher.types";
import { getTeacherInitials } from "../../utils/getTeacherInitials";
import "./TeacherCard.css";

export function TeacherCard({ teacher }: TeacherCardProps) {
  const fullName = `${teacher.first_name} ${teacher.last_name}`;
  const college = teacher.colleges?.[0]?.name;

  return (
    <div className="teacher-card">
      <div className="teacher-card__header">
        <div className="teacher-card__thumb">
          {teacher.image ? (
            <img src={teacher.image} alt={fullName} className="teacher-card__thumb-img" loading="lazy" />
          ) : (
            <div className="teacher-card__thumb-fallback" aria-hidden="true">
              {getTeacherInitials(teacher)}
            </div>
          )}

          {college && (
            <span className="teacher-card__badge">
              <Building2 className="teacher-card__badge-icon" aria-hidden="true" />
              {college}
            </span>
          )}
        </div>

        <span className="teacher-card__logo" aria-hidden="true">
          <Presentation />
        </span>

        <span className="teacher-card__chevron" aria-hidden="true">
          <ChevronRight />
        </span>
      </div>

      <h3 className="teacher-card__title">{fullName}</h3>

      {teacher.specialization && <span className="teacher-card__tag">{teacher.specialization}</span>}

      <dl className="teacher-card__meta">
        <div className="teacher-card__meta-row">
          <Mail className="teacher-card__meta-icon" aria-hidden="true" />
          <div className="teacher-card__meta-text">
            <dt className="teacher-card__meta-label">ელ-ფოსტა</dt>
            <dd className="teacher-card__meta-value">{teacher.email || "—"}</dd>
          </div>
        </div>
        <div className="teacher-card__meta-row">
          <Phone className="teacher-card__meta-icon" aria-hidden="true" />
          <div className="teacher-card__meta-text">
            <dt className="teacher-card__meta-label">ტელეფონი</dt>
            <dd className="teacher-card__meta-value">{teacher.phone || "—"}</dd>
          </div>
        </div>
      </dl>

      <Link to={`/teachers/${teacher.id}`} className="teacher-card__cta">
        ვრცლად
        <ArrowRight className="teacher-card__cta-icon" aria-hidden="true" />
      </Link>
    </div>
  );
}
