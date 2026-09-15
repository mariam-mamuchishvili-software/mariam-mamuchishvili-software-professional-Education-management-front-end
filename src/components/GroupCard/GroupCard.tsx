// components/GroupCard.tsx
import React from "react";
import type { GroupCardProps } from "../../types/group.types";
import styles from "./GroupCard.module.css";

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{group.name}</h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>კოდი:</span>{" "}
            {group.code || "—"}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>ტევადობა:</span>{" "}
            {group.capacity ?? "—"}
          </p>
        </div>
      </div>

      <button onClick={() => onViewMore(group)} className={styles.viewButton}>
        ვრცლად &rarr;
      </button>
    </div>
  );
};
