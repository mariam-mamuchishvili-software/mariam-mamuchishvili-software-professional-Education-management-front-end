import {
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Settings,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import type { CabinetNavItem } from "../types/teacherCabinet.types";

export const TEACHER_CABINET_BASE = "/teacher-cabinet";

/**
 * Teacher shown in the cabinet until authentication exists. Override with
 * `VITE_DEMO_TEACHER_ID` in `.env`; it will be replaced by the signed-in teacher later.
 */
export const DEMO_TEACHER_ID = Number(import.meta.env.VITE_DEMO_TEACHER_ID ?? 1) || 1;

export const TEACHER_CABINET_NAV: CabinetNavItem[] = [
  { label: "დაფა", href: TEACHER_CABINET_BASE, icon: LayoutDashboard, section: "მიმოხილვა" },
  { label: "პროფილი", href: `${TEACHER_CABINET_BASE}/profile`, icon: UserRound, section: "პროფილი" },
  {
    label: "სამუშაო გამოცდილება",
    href: `${TEACHER_CABINET_BASE}/work-experience`,
    icon: Briefcase,
    section: "სამუშაო გამოცდილება",
  },
  { label: "განათლება", href: `${TEACHER_CABINET_BASE}/education`, icon: GraduationCap, section: "განათლება" },
  {
    label: "ტრენინგები",
    href: `${TEACHER_CABINET_BASE}/training`,
    icon: Award,
    section: "ტრენინგები და სერტიფიკატები",
  },
  { label: "ჯგუფები", href: `${TEACHER_CABINET_BASE}/groups`, icon: UsersRound, section: "ჯგუფები" },
  { label: "მოდულები", href: `${TEACHER_CABINET_BASE}/modules`, icon: BookOpen, section: "მოდულები" },
  { label: "სტუდენტები", href: `${TEACHER_CABINET_BASE}/students`, icon: Users, section: "სტუდენტები" },
  { label: "პარამეტრები", href: `${TEACHER_CABINET_BASE}/settings`, icon: Settings, section: "პარამეტრები" },
];
