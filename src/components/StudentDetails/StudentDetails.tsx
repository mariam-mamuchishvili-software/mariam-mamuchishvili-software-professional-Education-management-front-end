// components/StudentDetails.tsx
import React from "react";
import type { StudentDetailsProps } from "../../types/student.types";
import styles from "./StudentDetails.module.css";

export const StudentDetails: React.FC<StudentDetailsProps> = ({
  student,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {student.first_name} {student.last_name}
          </h1>
          <p className={styles.subtitle}>სტუდენტის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი საკონტაქტო და პირადი ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ელ-ფოსტა</span>
          <a href={`mailto:${student.email}`} className={styles.linkPrimary}>
            {student.email}
          </a>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ტელეფონი</span>
          <a href={`tel:${student.phone}`} className={styles.linkSecondary}>
            {student.phone}
          </a>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
          <span className={styles.infoLabel}>დაბადების თარიღი</span>
          <p className={styles.infoValue}>{student.birth_date}</p>
        </div>
      </div>

      {/* ჯგუფების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          ჯგუფები ({student.groups?.length || 0})
        </h3>

        {student.groups && student.groups.length > 0 ? (
          <div className={styles.badgeList}>
            {student.groups.map((group) => (
              <span key={group.id} className={styles.badge}>
                {group.name}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>ჯგუფები არ არის მითითებული.</p>
        )}
      </div>

      {/* მოდულების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          მოდულები ({student.modules?.length || 0})
        </h3>

        {student.modules && student.modules.length > 0 ? (
          <div className={styles.itemGrid}>
            {student.modules.map((module) => (
              <div key={module.id} className={styles.itemCard}>
                <span className={styles.itemName}>{module.name}</span>
                {module.code && (
                  <span className={styles.itemCode}>{module.code}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>მოდულები არ არის მითითებული.</p>
        )}
      </div>
    </div>
  );
};
