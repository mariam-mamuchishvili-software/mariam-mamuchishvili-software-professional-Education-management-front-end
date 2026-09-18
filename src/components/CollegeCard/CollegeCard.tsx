import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { CollegeCardProps } from "../../types/college.types";
import "./CollegeCard.css";

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <EntityCardShell
      title={college.name}
      to={`/colleges/${college.id}`}
      accentClassName="college-card"
      meta={[
        { label: "მისამართი", value: college.address },
        { label: "ელ-ფოსტა", value: college.email },
      ]}
    />
  );
}
