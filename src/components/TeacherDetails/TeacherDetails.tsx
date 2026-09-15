// components/TeacherDetails.tsx
import React from "react";
import type { TeacherDetailsProps } from "../../types/teacher.types";
import styles from "./TeacherDetails.module.css";

export const TeacherDetails: React.FC<TeacherDetailsProps> = ({
  teacher,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>
            {teacher.first_name} {teacher.last_name}
          </h1>
          <p className={styles.subtitle}>მასწავლებლის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი საკონტაქტო ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ელ-ფოსტა</span>
          <a href={`mailto:${teacher.email}`} className={styles.emailLink}>
            {teacher.email}
          </a>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ტელეფონი</span>
          <a href={`tel:${teacher.phone}`} className={styles.phoneLink}>
            {teacher.phone}
          </a>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
          <span className={styles.infoLabel}>სპეციალობა</span>
          <p className={styles.infoValue}>{teacher.specialization}</p>
        </div>
      </div>

      {/* კოლეჯების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          კოლეჯები ({teacher.colleges?.length || 0})
        </h3>

        {teacher.colleges && teacher.colleges.length > 0 ? (
          <div className={styles.collegeList}>
            {teacher.colleges.map((college) => (
              <span key={college.id} className={styles.collegeBadge}>
                {college.name}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>კოლეჯები არ არის მითითებული.</p>
        )}
      </div>

      {/* მოდულების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          მოდულები ({teacher.modules?.length || 0})
        </h3>

        {teacher.modules && teacher.modules.length > 0 ? (
          <div className={styles.moduleGrid}>
            {teacher.modules.map((module) => (
              <div key={module.id} className={styles.moduleItem}>
                <span className={styles.moduleName}>{module.name}</span>
                {module.code && (
                  <span className={styles.moduleCode}>{module.code}</span>
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
