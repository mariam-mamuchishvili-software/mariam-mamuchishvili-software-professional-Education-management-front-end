// types/collegeCabinet.types.ts

import type { Theme } from "../hooks/useTheme";
import type { College } from "./college.types";
import type { Module } from "./module.types";
import type { Profession } from "./profession.types";
import type { Student } from "./student.types";
import type { StudentCertificate, StudentEducation } from "./studentCabinet.types";
import type { Teacher } from "./teacher.types";
import type { CabinetNavItem } from "./teacherCabinet.types";

export type { CabinetNavItem };

/** GroupStatus enum on the backend. */
export type GroupStatus = "planned" | "active" | "completed";

/** `study_shift` options of the group form in the admin panel. */
export type StudyShift = "morning" | "afternoon" | "evening";

/** Mirrors the backend GroupResource as the college cabinet returns it. */
export interface CollegeGroup {
  id: number;
  college_id: number | null;
  profession_id: number;
  name: string;
  code?: string;
  capacity?: number;
  study_shift?: StudyShift | string | null;
  status: GroupStatus;
  starts_on?: string | null;
  ends_on?: string | null;
  students_count?: number;
  profession?: CollegeProfession;
  students?: Student[];
  created_at?: string;
  updated_at?: string;
}

/** StudentResource with the college's groups and, on the details endpoint, the student's records. */
export interface CollegeStudent extends Omit<Student, "groups"> {
  groups?: CollegeGroup[];
  educations?: StudentEducation[];
  certificates?: StudentCertificate[];
}

export interface CollegeProfession extends Omit<Profession, "modules" | "groups"> {
  modules_count?: number;
  modules?: Module[];
  groups?: CollegeGroup[];
}

export interface CollegeModule extends Omit<Module, "teachers" | "professions"> {
  teachers?: Teacher[];
  professions?: CollegeProfession[];
}

/** AnnouncementAudience enum on the backend. */
export type AnnouncementAudience = "everyone" | "teachers" | "students";

/** Mirrors the backend AnnouncementResource. */
export interface CollegeAnnouncement {
  id: number;
  college_id: number;
  title: string;
  body: string;
  audience: AnnouncementAudience;
  is_important: boolean;
  /** Null while the announcement is a draft. */
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
}

/** AttendanceStatus enum on the backend. */
export type AttendanceStatus = "present" | "absent" | "late" | "excused";

/** Mirrors the backend AttendanceResource. */
export interface CollegeAttendance {
  id: number;
  group_id: number;
  group_name?: string | null;
  student_id: number;
  student_name?: string | null;
  teacher_id: number | null;
  teacher_name?: string | null;
  date: string;
  status: AttendanceStatus;
  note: string | null;
}

/** Query of `GET /api/me/college/attendance`; every filter is optional. */
export interface AttendanceFilters {
  group_id?: number;
  student_id?: number;
  from?: string;
  until?: string;
}

export interface CollegeStatistics {
  students: number;
  teachers: number;
  groups: number;
  professions: number;
  modules: number;
}

/** `GET /api/me/college` — the college with its totals and latest records (CollegeCabinetController). */
export interface CollegeCabinetData {
  college: College;
  statistics: CollegeStatistics;
  latest_students: CollegeStudent[];
  latest_announcements: CollegeAnnouncement[];
}

/** `GET /api/me/college/reports` — CollegeReport::toArray(). */
export interface CollegeReport {
  students_by_profession: { profession: string; groups: number; students: number }[];
  group_load: {
    group: string;
    code: string;
    profession: string | null;
    /** English label of the status, e.g. "Active". */
    status: string;
    capacity: number;
    students: number;
    fill_percent: number;
  }[];
  teacher_distribution: { teacher: string; specialization: string | null; modules: number }[];
  completion: {
    studying: number;
    graduated: number;
    withdrawn: number;
    total: number;
    graduation_rate_percent: number | null;
  };
  attendance_by_group: { group: string; marks: number; attended: number; attendance_percent: number | null }[];
}

/** Shared with every cabinet page through the layout's <Outlet context>. */
export interface CollegeCabinetContext {
  data: CollegeCabinetData;
  /** Sanctum token of the signed-in college administrator or staff member. */
  token: string;
  signOut: () => void;
  theme: Theme;
  toggleTheme: () => void;
}
