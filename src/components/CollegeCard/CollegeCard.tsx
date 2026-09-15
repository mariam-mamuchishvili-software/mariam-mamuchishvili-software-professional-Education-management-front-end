// components/CollegeCard.tsx
import React from "react";
import type { CollegeCardProps } from "../../types/college.types";
import styles from "./CollegeCard.module.css";

export const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{college.name}</h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>მისამართი:</span>{" "}
            {college.address}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>ელ-ფოსტა:</span>{" "}
            {college.email}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewMore(college)}
        className={styles.viewButton}
      >
        ვრცლად &rarr;
      </button>
    </div>
  );
};
