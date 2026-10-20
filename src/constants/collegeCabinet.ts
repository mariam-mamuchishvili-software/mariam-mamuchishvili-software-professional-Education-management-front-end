import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Presentation,
  UsersRound,
} from "lucide-react";
import type {
  AnnouncementAudience,
  AttendanceStatus,
  CabinetNavItem,
  GroupStatus,
} from "../types/collegeCabinet.types";

export const COLLEGE_CABINET_BASE = "/college-cabinet";
export const COLLEGE_LOGIN_PATH = `${COLLEGE_CABINET_BASE}/login`;

export const COLLEGE_CABINET_NAV: CabinetNavItem[] = [
  { label: "დაფა", href: COLLEGE_CABINET_BASE, icon: LayoutDashboard, section: "მიმოხილვა" },
  { label: "კოლეჯი", href: `${COLLEGE_CABINET_BASE}/profile`, icon: Building2, section: "კოლეჯის პროფილი" },
  { label: "სტუდენტები", href: `${COLLEGE_CABINET_BASE}/students`, icon: GraduationCap, section: "სტუდენტები" },
  { label: "პედაგოგები", href: `${COLLEGE_CABINET_BASE}/teachers`, icon: Presentation, section: "პედაგოგები" },
  { label: "ჯგუფები", href: `${COLLEGE_CABINET_BASE}/groups`, icon: UsersRound, section: "ჯგუფები" },
  { label: "პროფესიები", href: `${COLLEGE_CABINET_BASE}/professions`, icon: Briefcase, section: "პროფესიები" },
  { label: "მოდულები", href: `${COLLEGE_CABINET_BASE}/modules`, icon: BookOpen, section: "მოდულები" },
  { label: "განცხადებები", href: `${COLLEGE_CABINET_BASE}/announcements`, icon: Megaphone, section: "განცხადებები" },
  { label: "დასწრება", href: `${COLLEGE_CABINET_BASE}/attendance`, icon: CalendarCheck, section: "დასწრება" },
  { label: "ანგარიშები", href: `${COLLEGE_CABINET_BASE}/reports`, icon: BarChart3, section: "ანგარიშები" },
];

export const GROUP_STATUS_LABELS: Record<GroupStatus, string> = {
  planned: "დაგეგმილი",
  active: "აქტიური",
  completed: "დასრულებული",
};

/** Report rows carry the English enum label (GroupStatus::getLabel) rather than the value. */
export const GROUP_STATUS_BY_LABEL: Record<string, GroupStatus> = {
  Planned: "planned",
  Active: "active",
  Completed: "completed",
};

export const STUDY_SHIFT_LABELS: Record<string, string> = {
  morning: "დილის",
  afternoon: "დღის",
  evening: "საღამოს",
};

export const AUDIENCE_LABELS: Record<AnnouncementAudience, string> = {
  everyone: "პედაგოგები და სტუდენტები",
  teachers: "პედაგოგები",
  students: "სტუდენტები",
};

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "დაესწრო",
  absent: "არ დაესწრო",
  late: "დააგვიანა",
  excused: "საპატიო",
};
