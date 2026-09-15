import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { ProfessionCardProps } from "../../types/profession.types";

export function ProfessionCard({ profession }: ProfessionCardProps) {
  return (
    <EntityCardShell
      title={profession.name}
      to={`/professions/${profession.id}`}
      meta={[
        { label: "კოდი", value: profession.code },
        { label: "კვალიფიკაცია", value: profession.qualification },
      ]}
    />
  );
}
