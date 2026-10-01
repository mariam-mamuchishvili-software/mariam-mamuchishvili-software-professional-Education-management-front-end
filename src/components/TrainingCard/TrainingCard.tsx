import { PlayCircle, Presentation, UserRound, Users } from "lucide-react";
import type { TrainingCardProps } from "../../types/training.types";
import "../CollegeCard/CollegeCard.css";

const ACCENT_PALETTE = ["violet", "emerald", "sky", "amber", "rose"] as const;

/**
 * Shares CollegeCard's styles so trainings look identical to colleges on the home page.
 */
export function TrainingCard({ training }: TrainingCardProps) {
  const accent = ACCENT_PALETTE[training.id % ACCENT_PALETTE.length];
  const presenterNames = training.presenters
    ?.map((presenter) => `${presenter.first_name} ${presenter.last_name}`)
    .join(", ");
  const participantsCount = training.participants_count ?? 0;

  return (
    <div className="college-card" data-accent={accent}>
      <div className="college-card__header">
        <div className="college-card__thumb">
          {training.poster ? (
            <img
              src={training.poster}
              alt={training.title}
              className="college-card__thumb-img"
              loading="lazy"
            />
          ) : (
            <div className="college-card__thumb-fallback" aria-hidden="true">
              {training.title.trim().charAt(0)}
            </div>
          )}

          <span className="college-card__badge">
            <Users className="college-card__badge-icon" aria-hidden="true" />
            {participantsCount} მონაწილე
          </span>
        </div>

        <span className="college-card__logo" aria-hidden="true">
          <Presentation />
        </span>
      </div>

      <h3 className="college-card__title">{training.title}</h3>

      {training.presenters?.[0] && (
        <span className="college-card__tag">
          {training.presenters[0].first_name} {training.presenters[0].last_name}
        </span>
      )}

      <dl className="college-card__meta">
        <div className="college-card__meta-row">
          <UserRound className="college-card__meta-icon" aria-hidden="true" />
          <div className="college-card__meta-text">
            <dt className="college-card__meta-label">პრეზენტერები</dt>
            <dd className="college-card__meta-value">{presenterNames || "—"}</dd>
          </div>
        </div>
        <div className="college-card__meta-row">
          <Users className="college-card__meta-icon" aria-hidden="true" />
          <div className="college-card__meta-text">
            <dt className="college-card__meta-label">მონაწილეები</dt>
            <dd className="college-card__meta-value">{participantsCount}</dd>
          </div>
        </div>
      </dl>

      {training.video_link && (
        <a
          href={training.video_link}
          data-fancybox="training-videos"
          data-caption={training.title}
          className="college-card__cta"
        >
          ვიდეოს ნახვა
          <PlayCircle className="college-card__cta-icon" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
