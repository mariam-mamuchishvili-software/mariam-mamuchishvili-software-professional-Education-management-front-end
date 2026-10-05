import type { Teacher } from "../../types/teacher.types";
import { getTeacherInitials } from "../../utils/getTeacherInitials";

type AvatarSize = "sm" | "md" | "xl";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  xl: "size-24 text-2xl sm:size-28 sm:text-3xl",
};

interface TeacherAvatarProps {
  teacher: Pick<Teacher, "first_name" | "last_name" | "image">;
  size?: AvatarSize;
  className?: string;
}

/** Round teacher photo with the same violet initials fallback as TeacherCard. */
export function TeacherAvatar({ teacher, size = "md", className = "" }: TeacherAvatarProps) {
  const base = `${SIZE_CLASSES[size]} shrink-0 rounded-full ${className}`;

  if (teacher.image) {
    return (
      <img
        src={teacher.image}
        alt={`${teacher.first_name} ${teacher.last_name}`}
        className={`${base} object-cover object-[center_20%]`}
      />
    );
  }

  return (
    <span
      className={`${base} flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-700 font-semibold tracking-wide text-white`}
      aria-hidden="true"
    >
      {getTeacherInitials(teacher)}
    </span>
  );
}
