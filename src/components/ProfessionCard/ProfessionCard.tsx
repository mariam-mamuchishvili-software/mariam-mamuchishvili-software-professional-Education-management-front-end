// components/ProfessionCard.tsx
import React from "react";
import type { ProfessionCardProps } from "../../types/profession.types";
import styles from "./ProfessionCard.module.css";

export const ProfessionCard: React.FC<ProfessionCardProps> = ({
  profession,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{profession.name}</h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>კოდი:</span>{" "}
            {profession.code || "—"}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>კვალიფიკაცია:</span>{" "}
            {profession.qualification || "—"}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewMore(profession)}
        className={styles.viewButton}
      >
        ვრცლად &rarr;
      </button>
    </div>
  );
};
