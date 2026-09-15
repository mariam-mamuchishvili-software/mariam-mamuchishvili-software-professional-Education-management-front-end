// types/college.types.ts

export interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  specialization?: string;
}

export interface College {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  teachers?: Teacher[];
  created_at?: string;
  updated_at?: string;
}

export interface CollegeCardProps {
  college: College;
}

export interface CollegeDetailsProps {
  college: College;
  backHref: string;
}
