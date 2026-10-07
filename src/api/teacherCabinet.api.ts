import { MOCK_EDUCATIONS, MOCK_TRAININGS, MOCK_WORK_EXPERIENCES } from "../mocks/teacherCabinet.mock";
import type { CabinetTeacher, TeacherCabinetData } from "../types/teacherCabinet.types";
import type { Teacher, TeacherEducation, TeacherTraining, TeacherWorkExperience } from "../types/teacher.types";
import { collectTeacherGroups, collectTeacherStudents } from "../utils/teacherCabinet";
import { apiGet, apiSendForm, buildIncludeQuery } from "./client";
import type { ApiItemResponse } from "./types";

/** Nested includes the public teacher endpoint allows (see TeacherController::allowedIncludes). */
const CABINET_INCLUDES = ["colleges", "modules.professions.groups", "modules.students"];

export function getCabinetTeacher(id: number | string, signal?: AbortSignal) {
  return apiGet<ApiItemResponse<CabinetTeacher>>(`/teachers/${id}${buildIncludeQuery(CABINET_INCLUDES)}`, signal);
}

/** Uploads a new profile photo (stored on Cloudinary; the previous one is removed server-side). */
export function updateTeacherPhoto(id: number | string, file: File) {
  const body = new FormData();
  body.append("image", file);
  return apiSendForm<ApiItemResponse<Teacher>>(`/teachers/${id}`, body, "PUT");
}

/*
 * The endpoints below require a signed-in teacher (`auth:sanctum`, `/api/me/*`). Until auth is
 * added they resolve demo data with the same shape; switch each body to the commented call then.
 */

export function getMyWorkExperiences(teacherId: number): Promise<TeacherWorkExperience[]> {
  // return apiGet<ApiListResponse<TeacherWorkExperience>>("/me/work-experiences", signal).then((r) => r.data);
  return Promise.resolve(MOCK_WORK_EXPERIENCES.map((item) => ({ ...item, teacher_id: teacherId })));
}

export function getMyEducations(teacherId: number): Promise<TeacherEducation[]> {
  // return apiGet<ApiListResponse<TeacherEducation>>("/me/educations", signal).then((r) => r.data);
  return Promise.resolve(MOCK_EDUCATIONS.map((item) => ({ ...item, teacher_id: teacherId })));
}

export function getMyTrainings(teacherId: number): Promise<TeacherTraining[]> {
  // return apiGet<ApiListResponse<TeacherTraining>>("/me/trainings", signal).then((r) => r.data);
  return Promise.resolve(MOCK_TRAININGS.map((item) => ({ ...item, teacher_id: teacherId })));
}

/** Everything the cabinet shows, loaded once by the layout and shared with every page. */
export async function getTeacherCabinet(teacherId: number, signal?: AbortSignal): Promise<TeacherCabinetData> {
  const [{ data: teacher }, workExperiences, educations, trainings] = await Promise.all([
    getCabinetTeacher(teacherId, signal),
    getMyWorkExperiences(teacherId),
    getMyEducations(teacherId),
    getMyTrainings(teacherId),
  ]);
  const modules = teacher.modules ?? [];

  return {
    teacher,
    workExperiences,
    educations,
    trainings,
    modules,
    groups: collectTeacherGroups(modules),
    students: collectTeacherStudents(modules),
  };
}
