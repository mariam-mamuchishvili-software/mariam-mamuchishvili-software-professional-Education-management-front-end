import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import "./EntityCardShell.css";

interface MetaRow {
  label: string;
  value: ReactNode;
}

interface EntityCardShellProps {
  title: string;
  to: string;
  meta: MetaRow[];
  eyebrow?: string;
  /** Scoped class name (e.g. "college-card") that sets the entity's accent color. */
  accentClassName?: string;
}

export function EntityCardShell({ title, to, meta, eyebrow, accentClassName }: EntityCardShellProps) {
  return (
    <div className={`entity-card-shell${accentClassName ? ` ${accentClassName}` : ""}`}>
      <div>
        {eyebrow && <p className="entity-card-shell__eyebrow">{eyebrow}</p>}
        <h3 className="entity-card-shell__title">{title}</h3>

        <dl className="entity-card-shell__meta">
          {meta.map((row) => (
            <div key={row.label} className="entity-card-shell__meta-row">
              <dt className="entity-card-shell__meta-label">{row.label}:</dt>
              <dd className="entity-card-shell__meta-value">{row.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Link to={to} className="entity-card-shell__link">
        ვრცლად
        <ArrowRight className="entity-card-shell__link-icon" aria-hidden="true" />
      </Link>
    </div>
  );
}
