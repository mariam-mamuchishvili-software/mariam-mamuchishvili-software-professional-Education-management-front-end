// types/profession.ts

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

// მოკლე ხედვის (Card) Props
export interface ProfessionCardProps {
  profession: Profession;
  onViewMore: (profession: Profession) => void;
}

// სრული ხედვის (Full Details) Props
export interface ProfessionDetailsProps {
  profession: Profession;
  onBack: () => void;
}
