import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { GroupCardProps } from "../../types/group.types";
import "./GroupCard.css";

export function GroupCard({ group }: GroupCardProps) {
  return (
    <EntityCardShell
      title={group.name}
      to={`/groups/${group.id}`}
      eyebrow={group.profession?.name}
      accentClassName="group-card"
      meta={[
        { label: "კოდი", value: group.code },
        { label: "ტევადობა", value: group.capacity },
      ]}
    />
  );
}
