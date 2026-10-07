// types/teacherCabinet.types.ts

import type { ComponentType } from "react";
import type { Theme } from "../hooks/useTheme";
import type { College } from "./college.types";
import type { Group } from "./group.types";
import type { Module, ProfessionRef } from "./module.types";
import type { Student } from "./student.types";
import type { Teacher, TeacherEducation, TeacherTraining, TeacherWorkExperience } from "./teacher.types";

/** Profession as returned by `?include=modules.professions.groups`. */
export interface CabinetProfession extends ProfessionRef {
  groups?: Group[];
}

/** Module as returned by `?include=modules.professions.groups,modules.students`. */
export interface CabinetModule extends Omit<Module, "professions" | "students" | "teachers"> {
  professions?: CabinetProfession[];
  students?: Student[];
}

/** Teacher as loaded for the cabinet (the public show endpoint with nested includes). */
export interface CabinetTeacher extends Omit<Teacher, "modules" | "colleges"> {
  colleges?: College[];
  modules?: CabinetModule[];
}

/** A group the teacher reaches through one of their modules' professions. */
export interface CabinetGroup extends Group {
  professionName: string;
  moduleNames: string[];
}

/** A student enrolled in at least one of the teacher's modules. */
export interface CabinetStudent extends Student {
  moduleNames: string[];
}

export interface TeacherCabinetData {
  teacher: CabinetTeacher;
  workExperiences: TeacherWorkExperience[];
  educations: TeacherEducation[];
  trainings: TeacherTraining[];
  modules: CabinetModule[];
  groups: CabinetGroup[];
  students: CabinetStudent[];
}

/** Shared with every cabinet page through the layout's <Outlet context>. */
export interface TeacherCabinetContext {
  data: TeacherCabinetData;
  /** Merges saved fields into the loaded teacher so every page and the header reflect them. */
  updateTeacher: (patch: Partial<CabinetTeacher>) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export interface CabinetNavItem {
  label: string;
  /** Path relative to the app root, e.g. "/teacher-cabinet/groups". */
  href: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  /** Second breadcrumb segment shown in the cabinet header. */
  section: string;
}

export interface ProfileCompletionItem {
  label: string;
  done: boolean;
}
