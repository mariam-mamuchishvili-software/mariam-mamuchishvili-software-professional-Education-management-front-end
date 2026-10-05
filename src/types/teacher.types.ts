// types/teacher.types.ts

import type { SocialLink } from "./social.types";

export interface CollegeRef {
  id: number;
  name: string;
}

export interface ModuleRef {
  id: number;
  name: string;
  code?: string;
}

export interface TeacherDetail {
  id: number;
  biography?: string | null;
  additional_information?: string | null;
  social_links?: SocialLink[];
}

export type TeacherInclude = "colleges" | "modules";

/** Mirrors the backend TeacherWorkExperienceResource. */
export interface TeacherWorkExperience {
  id: number;
  teacher_id: number;
  organization: string;
  position: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** Mirrors the backend TeacherEducationResource. */
export interface TeacherEducation {
  id: number;
  teacher_id: number;
  institution: string;
  degree: string;
  specialization?: string | null;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** Mirrors the backend TeacherTrainingResource. */
export interface TeacherTraining {
  id: number;
  teacher_id: number;
  title: string;
  organizer?: string | null;
  certificate_number?: string | null;
  issue_date?: string | null;
  expiry_date?: string | null;
  certificate_url?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  /** Cloudinary secure URL of the teacher's photo. */
  image?: string | null;
  detail?: TeacherDetail | null;
  colleges?: CollegeRef[];
  modules?: ModuleRef[];
  /** Only returned for the teacher themselves or an administrator (see TeacherController). */
  work_experiences?: TeacherWorkExperience[];
  educations?: TeacherEducation[];
  trainings?: TeacherTraining[];
  created_at?: string;
  updated_at?: string;
}

export interface TeacherCardProps {
  teacher: Teacher;
}

export interface TeacherDetailsProps {
  teacher: Teacher;
  backHref: string;
  selectedIncludes: TeacherInclude[];
  onToggleInclude: (include: TeacherInclude) => void;
}
