// components/TeacherCard.tsx
import React from "react";
import type { TeacherCardProps } from "../../types/teacher.types";
import styles from "./TeacherCard.module.css";

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>
          {teacher.first_name} {teacher.last_name}
        </h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>ელ-ფოსტა:</span>{" "}
            {teacher.email}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>სპეციალობა:</span>{" "}
            {teacher.specialization}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewMore(teacher)}
        className={styles.viewButton}
      >
        ვრცლად &rarr;
      </button>
    </div>
  );
};
