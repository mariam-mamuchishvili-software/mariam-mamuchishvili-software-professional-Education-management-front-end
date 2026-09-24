import { CollegeAvatars } from "../CollegeAvatars/CollegeAvatars";
import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { ProfessionCardProps } from "../../types/profession.types";
import "./ProfessionCard.css";

export function ProfessionCard({ profession }: ProfessionCardProps) {
  return (
    <EntityCardShell
      title={profession.name}
      to={`/professions/${profession.id}`}
      accentClassName="profession-card"
      meta={[
        { label: "კოდი", value: profession.code },
        { label: "კვალიფიკაცია", value: profession.qualification },
      ]}
    >
      {profession.colleges && profession.colleges.length > 0 && (
        <CollegeAvatars colleges={profession.colleges} />
      )}
    </EntityCardShell>
  );
}
