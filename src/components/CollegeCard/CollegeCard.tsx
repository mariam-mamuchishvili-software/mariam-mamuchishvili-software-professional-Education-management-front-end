import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { CollegeCardProps } from "../../types/college.types";

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <EntityCardShell
      title={college.name}
      to={`/colleges/${college.id}`}
      meta={[
        { label: "მისამართი", value: college.address },
        { label: "ელ-ფოსტა", value: college.email },
      ]}
    />
  );
}
