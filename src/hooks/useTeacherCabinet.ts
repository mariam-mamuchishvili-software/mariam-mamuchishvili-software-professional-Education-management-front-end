import { useOutletContext } from "react-router";
import type { TeacherCabinetContext } from "../types/teacherCabinet.types";

/** Cabinet data and theme controls provided by TeacherCabinetLayout. */
export function useTeacherCabinet() {
  return useOutletContext<TeacherCabinetContext>();
}
