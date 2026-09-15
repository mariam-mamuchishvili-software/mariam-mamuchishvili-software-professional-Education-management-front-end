// types/profession.types.ts

export interface ModuleRef {
  id: number;
  name: string;
  code?: string;
}

export interface GroupRef {
  id: number;
  name: string;
  code?: string;
}

export interface Profession {
  id: number;
  name: string;
  code?: string;
  description?: string;
  duration?: string;
  qualification?: string;
  modules?: ModuleRef[];
  groups?: GroupRef[];
  created_at?: string;
  updated_at?: string;
}

export interface ProfessionCardProps {
  profession: Profession;
}

export interface ProfessionDetailsProps {
  profession: Profession;
  backHref: string;
}
