import type { Teacher } from "../../types/teacher.types";
import { getTeacherInitials } from "../../utils/getTeacherInitials";

interface TeacherPhotoProps {
  teacher: Pick<Teacher, "first_name" | "last_name" | "specialization" | "image">;
}

/**
 * Large portrait block for the teacher details page (the teacher counterpart of CollegePoster).
 * Falls back to a branded initials placeholder when no photo is set.
 */
export function TeacherPhoto({ teacher }: TeacherPhotoProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
      {teacher.image ? (
        <img
          src={teacher.image}
          alt={`${teacher.first_name} ${teacher.last_name}`}
          className="block aspect-[4/3] w-full object-cover object-[center_20%] sm:aspect-[16/9] lg:aspect-[3/4]"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-500 via-violet-600 to-purple-800 px-6 text-center sm:aspect-[16/9] lg:aspect-[3/4]">
          <span
            className="flex size-20 items-center justify-center rounded-full bg-white/15 text-3xl font-bold tracking-wide text-white ring-4 ring-white/25 sm:size-24 lg:size-28 lg:text-4xl"
            aria-hidden="true"
          >
            {getTeacherInitials(teacher)}
          </span>
          <p className="text-sm font-medium text-white/90">
            {teacher.first_name} {teacher.last_name}
          </p>
          {teacher.specialization && (
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
              {teacher.specialization}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
