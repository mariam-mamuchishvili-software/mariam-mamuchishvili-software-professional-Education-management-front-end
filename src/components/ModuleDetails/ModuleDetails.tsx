// components/ModuleDetails.tsx
import React from "react";
import type { ModuleDetailsProps } from "../../types/module.types";
import styles from "./ModuleDetails.module.css";

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({
  module,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{module.name}</h1>
          <p className={styles.subtitle}>მოდულის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>კოდი</span>
          <p className={styles.infoValue}>{module.code || "—"}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ხანგრძლივობა</span>
          <p className={styles.infoValue}>{module.duration || "—"}</p>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
          <span className={styles.infoLabel}>კრედიტები</span>
          <p className={styles.infoValue}>{module.credits ?? "—"}</p>
        </div>

        {module.description && (
          <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
            <span className={styles.infoLabel}>აღწერა</span>
            <p className={styles.infoValue}>{module.description}</p>
          </div>
        )}
      </div>

      {/* მასწავლებლების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          მასწავლებლები ({module.teachers?.length || 0})
        </h3>

        {module.teachers && module.teachers.length > 0 ? (
          <div className={styles.itemGrid}>
            {module.teachers.map((teacher) => (
              <div key={teacher.id} className={styles.itemCard}>
                <div>
                  <p className={styles.itemName}>
                    {teacher.first_name} {teacher.last_name}
                  </p>
                  <p className={styles.itemSub}>{teacher.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>
            მასწავლებლები ჯერ არ არიან დამატებული.
          </p>
        )}
      </div>

      {/* პროფესიების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          პროფესიები ({module.professions?.length || 0})
        </h3>

        {module.professions && module.professions.length > 0 ? (
          <div className={styles.badgeList}>
            {module.professions.map((profession) => (
              <span key={profession.id} className={styles.badge}>
                {profession.name}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>პროფესიები არ არის მითითებული.</p>
        )}
      </div>
    </div>
  );
};
