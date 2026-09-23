// types/profession.types.ts

import type { College } from "./college.types";

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

export type ProfessionInclude = "modules" | "groups" | "colleges";

export interface Profession {
  id: number;
  name: string;
  code?: string;
  description?: string;
  duration?: string;
  qualification?: string;
  modules?: ModuleRef[];
  groups?: GroupRef[];
  colleges?: College[];
  created_at?: string;
  updated_at?: string;
}

export interface ProfessionCardProps {
  profession: Profession;
}

export interface ProfessionDetailsProps {
  profession: Profession;
  backHref: string;
  selectedIncludes: ProfessionInclude[];
  onToggleInclude: (include: ProfessionInclude) => void;
}
