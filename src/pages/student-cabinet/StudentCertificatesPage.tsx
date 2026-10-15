import { Award, Info } from "lucide-react";
import { StudentCertificateCard } from "../../components/StudentCabinet/StudentCertificateCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useStudentCabinet } from "../../hooks/useStudentCabinet";
import { EmptyState } from "../../partials/EmptyState";

/** Read-only: certificates are issued by the college through the admin panel. */
export function StudentCertificatesPage() {
  const { certificates } = useStudentCabinet().data;
  const sorted = [...certificates].sort((a, b) => (b.issued_at ?? "").localeCompare(a.issued_at ?? ""));

  return (
    <div>
      <CabinetPageHeader title="სერტიფიკატები და კურსები" description={`${certificates.length} სერტიფიკატი`} />

      <p className="mb-6 flex items-start gap-2.5 rounded-xl border border-brand-200/70 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        სერტიფიკატებს გასცემს და ამატებს კოლეჯი. თუ სერტიფიკატი აკლია ან მონაცემი არასწორია, მიმართეთ კოლეჯის
        ადმინისტრაციას.
      </p>

      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((certificate) => (
            <StudentCertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="სერტიფიკატები ჯერ არ არის"
          description="კოლეჯის მიერ გაცემული სერტიფიკატები აქ გამოჩნდება."
          icon={<Award className="size-6" aria-hidden="true" />}
        />
      )}
    </div>
  );
}
