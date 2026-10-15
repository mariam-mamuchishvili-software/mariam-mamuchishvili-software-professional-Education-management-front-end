import { useOutletContext } from "react-router";
import type { StudentCabinetContext } from "../types/studentCabinet.types";

/** Cabinet data, session and theme controls provided by StudentCabinetLayout. */
export function useStudentCabinet() {
  return useOutletContext<StudentCabinetContext>();
}
