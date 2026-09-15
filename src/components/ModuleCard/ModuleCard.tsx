// components/ModuleCard.tsx
import React from "react";
import type { ModuleCardProps } from "../../types/module.types";
import styles from "./ModuleCard.module.css";

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{module.name}</h3>

        <div className={styles.meta}>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>კოდი:</span>{" "}
            {module.code || "—"}
          </p>
          <p className={styles.metaRow}>
            <span className={styles.metaLabel}>კრედიტები:</span>{" "}
            {module.credits ?? "—"}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewMore(module)}
        className={styles.viewButton}
      >
        ვრცლად &rarr;
      </button>
    </div>
  );
};
