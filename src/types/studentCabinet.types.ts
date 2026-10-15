// types/studentCabinet.types.ts

import type { Theme } from "../hooks/useTheme";
import type { College } from "./college.types";
import type { Group } from "./group.types";
import type { Module } from "./module.types";
import type { CabinetNavItem, ProfileCompletionItem } from "./teacherCabinet.types";

export type { CabinetNavItem, ProfileCompletionItem };

/** `profile` block of the backend StudentCabinetResource. */
export interface StudentProfile {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  birth_date: string;
  /** Cloudinary secure URL of the student's photo. */
  image?: string | null;
}

export type StudentEducationStatus = "active" | "completed" | "terminated";

/** Mirrors the backend StudentEducationResource. */
export interface StudentEducation {
  id: number;
  student_id: number;
  college_id: number | null;
  college_name?: string | null;
  profession_id: number | null;
  profession_name?: string | null;
  group_id: number | null;
  group_name?: string | null;
  institution_name: string | null;
  program_name: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: StudentEducationStatus;
  created_at?: string;
  updated_at?: string;
}

/** "college" when issued through the admin panel; "external" only for older records. */
export type StudentCertificateSource = "college" | "external";

/** Mirrors the backend StudentCertificateResource. */
export interface StudentCertificate {
  id: number;
  student_id: number;
  college_id: number | null;
  college_name?: string | null;
  title: string;
  issuer_name: string | null;
  certificate_number: string | null;
  issued_at: string | null;
  expires_at: string | null;
  /** Link to the certificate document (an uploaded file on Cloudinary or an outside URL). */
  file_path: string | null;
  source: StudentCertificateSource;
  created_at?: string;
  updated_at?: string;
}

/** `GET /api/me/student/cabinet` — StudentCabinetResource. */
export interface StudentCabinetData {
  profile: StudentProfile;
  current_studies: {
    colleges: College[];
    groups: Group[];
    modules: Module[];
  };
  education_history: StudentEducation[];
  certificates: StudentCertificate[];
}

/** Body of `POST/PATCH /api/me/student-educations`. */
export interface StudentEducationInput {
  college_id: number | null;
  profession_id: number | null;
  group_id: number | null;
  institution_name: string | null;
  program_name: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: StudentEducationStatus;
}

/** Shared with every cabinet page through the layout's <Outlet context>. */
export interface StudentCabinetContext {
  data: StudentCabinetData;
  /**
   * Sanctum token of the signed-in student, sent with every `/api/me/*` call. Null while
   * sign-in is optional: the backend then answers as its demo student.
   */
  token: string | null;
  /** Applies a saved change to the loaded cabinet so every page and the header reflect it. */
  updateCabinet: (updater: (data: StudentCabinetData) => StudentCabinetData) => void;
  /** No-op without a token. */
  signOut: () => void;
  theme: Theme;
  toggleTheme: () => void;
}
