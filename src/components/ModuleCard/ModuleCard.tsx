import { EntityCardShell } from "../EntityCardShell/EntityCardShell";
import type { ModuleCardProps } from "../../types/module.types";

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <EntityCardShell
      title={module.name}
      to={`/modules/${module.id}`}
      meta={[
        { label: "კოდი", value: module.code },
        { label: "კრედიტები", value: module.credits },
      ]}
    />
  );
}
