import type { StudentProfile } from "../../types/studentCabinet.types";
import { getStudentInitials } from "../StudentPhoto/StudentPhoto";

type AvatarSize = "sm" | "md" | "xl";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  xl: "size-24 text-2xl sm:size-28 sm:text-3xl",
};

interface StudentAvatarProps {
  student: Pick<StudentProfile, "first_name" | "last_name" | "image">;
  size?: AvatarSize;
  className?: string;
}

/** Round student photo with the same rose initials fallback as StudentPhoto. */
export function StudentAvatar({ student, size = "md", className = "" }: StudentAvatarProps) {
  const base = `${SIZE_CLASSES[size]} shrink-0 rounded-full ${className}`;

  if (student.image) {
    return (
      <img
        src={student.image}
        alt={`${student.first_name} ${student.last_name}`}
        className={`${base} object-cover object-[center_20%]`}
      />
    );
  }

  return (
    <span
      className={`${base} flex items-center justify-center bg-gradient-to-br from-rose-500 to-fuchsia-600 font-semibold tracking-wide text-white`}
      aria-hidden="true"
    >
      {getStudentInitials(student)}
    </span>
  );
}
