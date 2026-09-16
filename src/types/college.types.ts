// types/college.types.ts

import type { Group } from "./group.types";
import type { Profession } from "./profession.types";

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  specialization?: string;
}

export type CollegeInclude = "teachers" | "professions" | "groups";

export interface College {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  teachers?: Teacher[];
  professions?: Profession[];
  groups?: Group[];
  created_at?: string;
  updated_at?: string;
}

export interface CollegeCardProps {
  college: College;
}

export interface CollegeDetailsProps {
  college: College;
  backHref: string;
  selectedIncludes: CollegeInclude[];
  onToggleInclude: (include: CollegeInclude) => void;
}
