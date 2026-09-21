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

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  detail?: TeacherDetail | null;
  colleges?: CollegeRef[];
  modules?: ModuleRef[];
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
