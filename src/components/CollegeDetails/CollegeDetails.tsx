// components/CollegeDetails.tsx
import React from "react";
import type { CollegeDetailsProps } from "../../types/college.types";
import styles from "./CollegeDetails.module.css";

export const CollegeDetails: React.FC<CollegeDetailsProps> = ({
  college,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      {/* სათაური და უკან დაბრუნების ღილაკი */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{college.name}</h1>
          <p className={styles.subtitle}>კოლეჯის სრული ინფორმაცია</p>
        </div>
        <button onClick={onBack} className={styles.backButton}>
          &larr; უკან
        </button>
      </div>

      {/* ძირითადი საკონტაქტო ინფო */}
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>მისამართი</span>
          <p className={styles.infoValue}>{college.address}</p>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ელ-ფოსტა</span>
          <a href={`mailto:${college.email}`} className={styles.linkPrimary}>
            {college.email}
          </a>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ტელეფონი</span>
          <a href={`tel:${college.phone}`} className={styles.linkSecondary}>
            {college.phone}
          </a>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoLabel}>ვებ-საიტი</span>
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkPrimaryBlock}
          >
            {college.website}
          </a>
        </div>
      </div>

      {/* მასწავლებლების სია (BelongsToMany) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          მასწავლებლები ({college.teachers?.length || 0})
        </h3>

        {college.teachers && college.teachers.length > 0 ? (
          <div className={styles.itemGrid}>
            {college.teachers.map((teacher) => (
              <div key={teacher.id} className={styles.itemCard}>
                <div>
                  <p className={styles.itemName}>{teacher.name}</p>
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
    </div>
  );
};
