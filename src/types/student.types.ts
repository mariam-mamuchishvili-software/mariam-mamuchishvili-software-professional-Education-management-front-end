// types/student.types.ts

import type { College } from "./college.types";

export interface Group {
  id: number;
  name: string;
  code?: string;
}

export interface ModuleRef {
  id: number;
  name: string;
  code?: string;
}

export type StudentInclude = "groups" | "modules" | "colleges";

/** Includes the user can toggle on the details page (colleges are always loaded). */
export type StudentToggleInclude = Exclude<StudentInclude, "colleges">;

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  groups?: Group[];
  modules?: ModuleRef[];
  colleges?: College[];
  created_at?: string;
  updated_at?: string;
}

export interface StudentCardProps {
  student: Student;
}

export interface StudentDetailsProps {
  student: Student;
  backHref: string;
  selectedIncludes: StudentToggleInclude[];
  onToggleInclude: (include: StudentToggleInclude) => void;
}
