import { Building2, Calendar, Globe, Info, Mail, MapPin, Phone } from "lucide-react";
import { CollegeProfileCard } from "../../components/CollegeCabinet/CollegeProfileCard";
import { CollegeLocationMap } from "../../components/CollegeLocationMap/CollegeLocationMap";
import { InfoItem } from "../../components/InfoItem/InfoItem";
import { SocialLinks } from "../../components/SocialLinks/SocialLinks";
import { CabinetCard } from "../../components/TeacherCabinet/CabinetCard";
import { CabinetPageHeader } from "../../components/TeacherCabinet/CabinetPageHeader";
import { useCollegeCabinet } from "../../hooks/useCollegeCabinet";
import { formatDate } from "../../utils/formatDate";

export function CollegeProfilePage() {
  const { college } = useCollegeCabinet().data;
  const { detail } = college;

  return (
    <div>
      <CabinetPageHeader title="კოლეჯის პროფილი" description="კოლეჯის ინფორმაცია იცვლება მართვის პანელიდან." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <CollegeProfileCard college={college} />

          <CabinetCard title="ძირითადი ინფორმაცია" icon={Building2}>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoItem label="დასახელება" value={college.name} wide />
              <InfoItem label="მისამართი" value={college.address} icon={MapPin} wide />
              <InfoItem label="ელ-ფოსტა" value={college.email} icon={Mail} />
              <InfoItem label="ტელეფონი" value={college.phone} icon={Phone} />
              <InfoItem
                label="ვებგვერდი"
                icon={Globe}
                wide
                value={
                  college.website && (
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 hover:underline dark:text-brand-400"
                    >
                      {college.website}
                    </a>
                  )
                }
              />
              <InfoItem label="რეგისტრაციის თარიღი" value={formatDate(college.created_at)} icon={Calendar} />
              <InfoItem label="ბოლო განახლება" value={formatDate(college.updated_at)} icon={Calendar} />
            </div>
          </CabinetCard>

          {(detail?.description || detail?.additional_information) && (
            <CabinetCard title="კოლეჯის შესახებ" icon={Info}>
              {detail.description && (
                <p className="text-sm leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
                  {detail.description}
                </p>
              )}
              {detail.additional_information && (
                <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-slate-500 dark:text-slate-400">
                  {detail.additional_information}
                </p>
              )}
            </CabinetCard>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <SocialLinks links={detail?.social_links} />
          <CabinetCard title="მდებარეობა" icon={MapPin}>
            <CollegeLocationMap
              name={college.name}
              address={college.address}
              latitude={college.latitude}
              longitude={college.longitude}
            />
          </CabinetCard>
        </div>
      </div>
    </div>
  );
}
