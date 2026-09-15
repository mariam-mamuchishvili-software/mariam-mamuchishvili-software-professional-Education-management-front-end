// types/college.ts

export interface Teacher {
  id: number;
  name: string;
  email: string;
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

// ტიპი კოლეჯის შექმნისა და რედაქტირების ფორმისთვის
export type CollegeFormData = Omit<
  College,
  "id" | "teachers" | "created_at" | "updated_at"
>;

// კომპონენტის Props ინტერფეისი (onEdit და onDelete ჩახსნილია)
export interface CollegeCardProps {
  college: College;
  onViewMore: (college: College) => void;
}

export interface CollegeDetailsProps {
  college: College;
  onBack: () => void;
}

export interface CollegeFormProps {
  initialData?: College;
  onSubmit: (data: CollegeFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}
