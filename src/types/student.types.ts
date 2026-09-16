// types/student.types.ts

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

export type StudentInclude = "groups" | "modules";

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  groups?: Group[];
  modules?: ModuleRef[];
  created_at?: string;
  updated_at?: string;
}

export interface StudentCardProps {
  student: Student;
}

export interface StudentDetailsProps {
  student: Student;
  backHref: string;
  selectedIncludes: StudentInclude[];
  onToggleInclude: (include: StudentInclude) => void;
}
