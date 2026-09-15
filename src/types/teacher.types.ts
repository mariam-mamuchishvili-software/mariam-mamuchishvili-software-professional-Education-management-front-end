// types/teacher.types.ts

export interface CollegeRef {
  id: number;
  name: string;
}

export interface ModuleRef {
  id: number;
  name: string;
  code?: string;
}

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
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
}
