// types/group.ts

export interface ProfessionRef {
  id: number;
  name: string;
}

export interface StudentRef {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Group {
  id: number;
  profession_id: number;
  name: string;
  code?: string;
  capacity?: number;
  study_shift?: string;
  profession?: ProfessionRef;
  students?: StudentRef[];
  created_at?: string;
  updated_at?: string;
}

// მოკლე ხედვის (Card) Props
export interface GroupCardProps {
  group: Group;
  onViewMore: (group: Group) => void;
}

// სრული ხედვის (Full Details) Props
export interface GroupDetailsProps {
  group: Group;
  onBack: () => void;
}
