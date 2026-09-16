// types/module.types.ts

export interface TeacherRef {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ProfessionRef {
  id: number;
  name: string;
  code?: string;
}

export interface StudentRef {
  id: number;
  first_name: string;
  last_name: string;
}

export type ModuleInclude = "teachers" | "professions" | "students";

export interface Module {
  id: number;
  name: string;
  code?: string;
  description?: string;
  duration?: string;
  credits?: number;
  teachers?: TeacherRef[];
  professions?: ProfessionRef[];
  students?: StudentRef[];
  created_at?: string;
  updated_at?: string;
}

export interface ModuleCardProps {
  module: Module;
}

export interface ModuleDetailsProps {
  module: Module;
  backHref: string;
  selectedIncludes: ModuleInclude[];
  onToggleInclude: (include: ModuleInclude) => void;
}
