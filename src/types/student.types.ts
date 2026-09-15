// types/student.types.ts

export interface Group {
  id: number;
  name: string;
  code?: string;
}

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  groups?: Group[];
  created_at?: string;
  updated_at?: string;
}

export interface StudentCardProps {
  student: Student;
}

export interface StudentDetailsProps {
  student: Student;
  backHref: string;
}
