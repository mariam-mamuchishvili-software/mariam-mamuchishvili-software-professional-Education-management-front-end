import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router";
import type { CollegeCardProps } from "../../types/college.types";
import "./CollegeCard.css";

const ACCENT_PALETTE = ["violet", "emerald", "sky", "amber", "rose"] as const;

export function CollegeCard({ college }: CollegeCardProps) {
  const accent = ACCENT_PALETTE[college.id % ACCENT_PALETTE.length];
  const location = college.address?.split(",")[0]?.trim();
  const tag = college.professions?.[0]?.name;

  return (
    <div className="college-card" data-accent={accent}>
      <div className="college-card__header">
        <div className="college-card__thumb">
          {college.poster ? (
            <img
              src={college.poster}
              alt={college.name}
              className="college-card__thumb-img"
              loading="lazy"
            />
          ) : (
            <div className="college-card__thumb-fallback" aria-hidden="true">
              {college.name.trim().charAt(0)}
            </div>
          )}

          {location && (
            <span className="college-card__badge">
              <MapPin className="college-card__badge-icon" aria-hidden="true" />
              {location}
            </span>
          )}
        </div>

        <span
          className={`college-card__logo${college.logo ? " college-card__logo--image" : ""}`}
          aria-hidden="true"
        >
          {college.logo ? (
            <img
              src={college.logo}
              alt=""
              className="college-card__logo-img"
              loading="lazy"
            />
          ) : (
            <GraduationCap />
          )}
        </span>

        <span className="college-card__chevron" aria-hidden="true">
          <ChevronRight />
        </span>
      </div>

      <h3 className="college-card__title">{college.name}</h3>

      {tag && <span className="college-card__tag">{tag}</span>}

      <dl className="college-card__meta">
        <div className="college-card__meta-row">
          <MapPin className="college-card__meta-icon" aria-hidden="true" />
          <div className="college-card__meta-text">
            <dt className="college-card__meta-label">მისამართი</dt>
            <dd className="college-card__meta-value">
              {college.address ?? "—"}
            </dd>
          </div>
        </div>
        <div className="college-card__meta-row">
          <Mail className="college-card__meta-icon" aria-hidden="true" />
          <div className="college-card__meta-text">
            <dt className="college-card__meta-label">ელ-ფოსტა</dt>
            <dd className="college-card__meta-value">{college.email ?? "—"}</dd>
          </div>
        </div>
      </dl>

      <Link to={`/colleges/${college.id}`} className="college-card__cta">
        ვრცლად
        <ArrowRight className="college-card__cta-icon" aria-hidden="true" />
      </Link>
    </div>
  );
}
