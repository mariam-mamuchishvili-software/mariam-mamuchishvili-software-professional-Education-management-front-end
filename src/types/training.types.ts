// types/training.types.ts

export interface Presenter {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
}

export interface Training {
  id: number;
  title: string;
  description?: string | null;
  poster?: string | null;
  video_link?: string | null;
  presenters?: Presenter[];
  participants_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TrainingCardProps {
  training: Training;
}
