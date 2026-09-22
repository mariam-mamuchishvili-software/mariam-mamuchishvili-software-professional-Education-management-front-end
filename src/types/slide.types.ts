// types/slide.types.ts

export interface Slide {
  id: number;
  college_id: number;
  image: string | null;
  title: string;
  description?: string | null;
}
