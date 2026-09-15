// types/student.ts

export interface Group {
  id: number;
  name: string;
}

export interface Module {
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
  modules?: Module[];
  created_at?: string;
  updated_at?: string;
}

// მოკლე ხედვის (Card) Props
export interface StudentCardProps {
  student: Student;
  onViewMore: (student: Student) => void;
}

// სრული ხედვის (Full Details) Props
export interface StudentDetailsProps {
  student: Student;
  onBack: () => void;
}
