// types/teacher.ts

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

// მოკლე ხედვის (Card) Props
export interface TeacherCardProps {
  teacher: Teacher;
  onViewMore: (teacher: Teacher) => void;
}

// სრული ხედვის (Full Details) Props
export interface TeacherDetailsProps {
  teacher: Teacher;
  onBack: () => void;
}
