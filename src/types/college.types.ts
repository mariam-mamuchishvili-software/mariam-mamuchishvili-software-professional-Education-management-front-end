// types/college.types.ts

import type { Group } from "./group.types";
import type { Profession } from "./profession.types";
import type { SocialLink } from "./social.types";

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  specialization?: string;
}

export interface CollegeDetail {
  id: number;
  description?: string | null;
  additional_information?: string | null;
  social_links?: SocialLink[];
}

export type CollegeInclude = "teachers" | "professions" | "groups";

export interface College {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  poster?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  detail?: CollegeDetail | null;
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
