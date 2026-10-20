import { useOutletContext } from "react-router";
import type { CollegeCabinetContext } from "../types/collegeCabinet.types";

/** Dashboard data, session and theme controls provided by CollegeCabinetLayout. */
export function useCollegeCabinet() {
  return useOutletContext<CollegeCabinetContext>();
}
