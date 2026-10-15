import {
  Award,
  BookOpen,
  Building2,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { CabinetNavItem, StudentEducationStatus } from "../types/studentCabinet.types";

export const STUDENT_CABINET_BASE = "/student-cabinet";
export const STUDENT_LOGIN_PATH = `${STUDENT_CABINET_BASE}/login`;

export const STUDENT_CABINET_NAV: CabinetNavItem[] = [
  { label: "დაფა", href: STUDENT_CABINET_BASE, icon: LayoutDashboard, section: "მიმოხილვა" },
  { label: "პროფილი", href: `${STUDENT_CABINET_BASE}/profile`, icon: UserRound, section: "პროფილი" },
  { label: "განათლება", href: `${STUDENT_CABINET_BASE}/education`, icon: GraduationCap, section: "განათლების ისტორია" },
  {
    label: "სერტიფიკატები",
    href: `${STUDENT_CABINET_BASE}/certificates`,
    icon: Award,
    section: "სერტიფიკატები და კურსები",
  },
  { label: "კოლეჯები", href: `${STUDENT_CABINET_BASE}/colleges`, icon: Building2, section: "კოლეჯები" },
  { label: "ჯგუფები", href: `${STUDENT_CABINET_BASE}/groups`, icon: UsersRound, section: "ჯგუფები" },
  { label: "მოდულები", href: `${STUDENT_CABINET_BASE}/modules`, icon: BookOpen, section: "მოდულები" },
  { label: "პარამეტრები", href: `${STUDENT_CABINET_BASE}/settings`, icon: Settings, section: "პარამეტრები" },
];

/** Labels for StudentEducation.status (`in:active,completed,terminated` on the backend). */
export const EDUCATION_STATUS_LABELS: Record<StudentEducationStatus, string> = {
  active: "მიმდინარე",
  completed: "დასრულებული",
  terminated: "შეწყვეტილი",
};
