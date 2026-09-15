// components/ProfessionDetails.tsx
import React from "react";
import type { ProfessionDetailsProps } from "../../types/profession.types";
import styles from "./ProfessionDetails.module.css";

export const ProfessionDetails: React.FC<ProfessionDetailsProps> = ({
  profession,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{profession.name}</h1>
          <p className={styles.subtitle}>პროფესიის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>კოდი</span>
          <p className={styles.infoValue}>{profession.code || "—"}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ხანგრძლივობა</span>
          <p className={styles.infoValue}>{profession.duration || "—"}</p>
        </div>

        <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
          <span className={styles.infoLabel}>კვალიფიკაცია</span>
          <p className={styles.infoValue}>
            {profession.qualification || "—"}
          </p>
        </div>

        {profession.description && (
          <div className={`${styles.infoBox} ${styles.infoBoxWide}`}>
            <span className={styles.infoLabel}>აღწერა</span>
            <p className={styles.infoValue}>{profession.description}</p>
          </div>
        )}
      </div>

      {/* მოდულების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          მოდულები ({profession.modules?.length || 0})
        </h3>

        {profession.modules && profession.modules.length > 0 ? (
          <div className={styles.itemGrid}>
            {profession.modules.map((module) => (
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

      {/* ჯგუფების სია (HasMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          ჯგუფები ({profession.groups?.length || 0})
        </h3>

        {profession.groups && profession.groups.length > 0 ? (
          <div className={styles.badgeList}>
            {profession.groups.map((group) => (
              <span key={group.id} className={styles.badge}>
                {group.name}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>ჯგუფები არ არის მითითებული.</p>
        )}
      </div>
    </div>
  );
};
