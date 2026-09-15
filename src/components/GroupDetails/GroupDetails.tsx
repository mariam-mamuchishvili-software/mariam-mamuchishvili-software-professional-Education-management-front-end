// components/GroupDetails.tsx
import React from "react";
import type { GroupDetailsProps } from "../../types/group.types";
import styles from "./GroupDetails.module.css";

export const GroupDetails: React.FC<GroupDetailsProps> = ({
  group,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{group.name}</h1>
          <p className={styles.subtitle}>ჯგუფის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>კოდი</span>
          <p className={styles.infoValue}>{group.code || "—"}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ცვლა</span>
          <p className={styles.infoValue}>{group.study_shift || "—"}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ტევადობა</span>
          <p className={styles.infoValue}>{group.capacity ?? "—"}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>პროფესია</span>
          <p className={styles.infoValue}>{group.profession?.name || "—"}</p>
        </div>
      </div>

      {/* სტუდენტების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          სტუდენტები ({group.students?.length || 0})
        </h3>

        {group.students && group.students.length > 0 ? (
          <div className={styles.itemGrid}>
            {group.students.map((student) => (
              <div key={student.id} className={styles.itemCard}>
                <span className={styles.itemName}>
                  {student.first_name} {student.last_name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>სტუდენტები არ არის მითითებული.</p>
        )}
      </div>
    </div>
  );
};
