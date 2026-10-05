import type { TeacherEducation, TeacherTraining, TeacherWorkExperience } from "../types/teacher.types";

/**
 * Demo experience & qualification records for the teacher cabinet.
 *
 * The real data lives behind `auth:sanctum` (`/api/me/work-experiences`, `/api/me/educations`,
 * `/api/me/trainings`), so until authentication is added the cabinet reads these instead.
 * Shapes match the backend resources exactly, so swapping to the API is a one-line change in
 * `api/teacherCabinet.api.ts`.
 */

export const MOCK_WORK_EXPERIENCES: Omit<TeacherWorkExperience, "teacher_id">[] = [
  {
    id: 1,
    organization: "საქართველოს უნივერსიტეტი",
    position: "უფროსი ლექტორი",
    start_date: "2023-02-01",
    end_date: null,
    is_current: true,
    description:
      "ვკითხულობ ლექციებს პროფესიულ საგანმანათლებლო პროგრამებზე, ვხელმძღვანელობ სასწავლო მოდულების განახლებას და ვმუშაობ ახალგაზრდა მასწავლებლების მენტორად.",
  },
  {
    id: 2,
    organization: "თბილისის სახელმწიფო კოლეჯი",
    position: "ლექტორი",
    start_date: "2020-09-01",
    end_date: "2023-01-31",
    is_current: false,
    description: "პრაქტიკული მეცადინეობები და შეფასების სისტემის დანერგვა პროფესიულ ჯგუფებში.",
  },
  {
    id: 3,
    organization: "განათლების განვითარების ცენტრი",
    position: "სასწავლო პროგრამების კოორდინატორი",
    start_date: "2018-03-15",
    end_date: "2020-08-31",
    is_current: false,
    description: "ტრენინგ-პროგრამების დაგეგმვა და მასწავლებელთა პროფესიული განვითარების ღონისძიებების ორგანიზება.",
  },
  {
    id: 4,
    organization: "საჯარო სკოლა №51",
    position: "მასწავლებელი",
    start_date: "2015-09-01",
    end_date: "2018-03-01",
    is_current: false,
    description: null,
  },
];

export const MOCK_EDUCATIONS: Omit<TeacherEducation, "teacher_id">[] = [
  {
    id: 1,
    institution: "ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი",
    degree: "მაგისტრი",
    specialization: "განათლების მენეჯმენტი",
    start_date: "2013-09-15",
    end_date: "2015-07-01",
    description: "სამაგისტრო ნაშრომი: ციფრული ინსტრუმენტები პროფესიულ განათლებაში.",
  },
  {
    id: 2,
    institution: "ილიას სახელმწიფო უნივერსიტეტი",
    degree: "ბაკალავრი",
    specialization: "პედაგოგიკა",
    start_date: "2009-09-15",
    end_date: "2013-07-01",
    description: null,
  },
];

export const MOCK_TRAININGS: Omit<TeacherTraining, "teacher_id">[] = [
  {
    id: 1,
    title: "თანამედროვე შეფასების მეთოდები",
    organizer: "მასწავლებელთა პროფესიული განვითარების ეროვნული ცენტრი",
    certificate_number: "TPDC-2025-0412",
    issue_date: "2025-04-12",
    expiry_date: "2028-04-12",
    certificate_url: "https://example.com/certificates/TPDC-2025-0412",
    description: "ფორმატიული და განმავითარებელი შეფასების პრაქტიკული ინსტრუმენტები.",
  },
  {
    id: 2,
    title: "Google Certified Educator — Level 2",
    organizer: "Google for Education",
    certificate_number: "GCE2-88341",
    issue_date: "2024-11-03",
    expiry_date: "2027-11-03",
    certificate_url: "https://example.com/certificates/GCE2-88341",
    description: null,
  },
  {
    id: 3,
    title: "ინკლუზიური განათლება პროფესიულ კოლეჯებში",
    organizer: "UNICEF საქართველო",
    certificate_number: "UNI-INC-1190",
    issue_date: "2023-06-20",
    expiry_date: null,
    certificate_url: null,
    description: "სპეციალური საგანმანათლებლო საჭიროების მქონე სტუდენტებთან მუშაობის მეთოდიკა.",
  },
  {
    id: 4,
    title: "მოდულური პროგრამების შემუშავება",
    organizer: "განათლების ხარისხის განვითარების ეროვნული ცენტრი",
    certificate_number: "EQE-MOD-5521",
    issue_date: "2022-02-14",
    expiry_date: "2025-02-14",
    certificate_url: "https://example.com/certificates/EQE-MOD-5521",
    description: null,
  },
  {
    id: 5,
    title: "Project-Based Learning Facilitator",
    organizer: "British Council",
    certificate_number: null,
    issue_date: "2021-09-08",
    expiry_date: null,
    certificate_url: null,
    description: "პროექტზე დაფუძნებული სწავლების დაგეგმვა და ფასილიტაცია.",
  },
];
