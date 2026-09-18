import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { ModuleCardProps } from "../../types/module.types";
import "./ModuleCard.css";

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <EntityCardShell
      title={module.name}
      to={`/modules/${module.id}`}
      accentClassName="module-card"
      meta={[
        { label: "კოდი", value: module.code },
        { label: "კრედიტები", value: module.credits },
      ]}
    />
  );
}
