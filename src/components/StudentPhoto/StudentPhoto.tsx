import type { Student } from "../../types/student.types";

/** "Nino Beridze" → "NB"; used as the avatar placeholder when a student has no photo. */
export function getStudentInitials(student: Pick<Student, "first_name" | "last_name">) {
  return `${student.first_name.trim().charAt(0)}${student.last_name.trim().charAt(0)}`.toUpperCase();
}

interface StudentPhotoProps {
  student: Pick<Student, "first_name" | "last_name" | "image">;
}

/**
 * Large profile photo for the student details page (the student counterpart of CollegePoster).
 * Falls back to a branded initials avatar when no image is set.
 */
export function StudentPhoto({ student }: StudentPhotoProps) {
  const fullName = `${student.first_name} ${student.last_name}`;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-card lg:max-w-none dark:border-slate-800 dark:bg-slate-900">
      {student.image ? (
        <img
          src={student.image}
          alt={fullName}
          className="block aspect-[4/5] w-full rounded-xl object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 px-6 text-center dark:from-rose-600 dark:via-pink-700 dark:to-fuchsia-800">
          <span
            className="flex size-28 items-center justify-center rounded-full bg-white/15 text-4xl font-bold tracking-wide text-white ring-4 ring-white/25"
            aria-hidden="true"
          >
            {getStudentInitials(student)}
          </span>
          <p className="text-sm font-medium text-white/90">{fullName}</p>
        </div>
      )}
    </div>
  );
}
