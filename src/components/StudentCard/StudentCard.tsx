// components/StudentCard.tsx
import React from "react";
import type { StudentCardProps } from "../../types/student.types";
import styles from "./StudentCard.module.css";

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>
          {student.first_name} {student.last_name}
        </h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>ელ-ფოსტა:</span>{" "}
            {student.email}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>ტელეფონი:</span>{" "}
            {student.phone}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewMore(student)}
        className={styles.viewButton}
      >
        ვრცლად &rarr;
      </button>
    </div>
  );
};
