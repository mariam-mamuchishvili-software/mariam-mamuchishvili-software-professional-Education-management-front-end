import { Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { StudentCabinetLayout } from "../layouts/StudentCabinetLayout";
import { TeacherCabinetLayout } from "../layouts/TeacherCabinetLayout";
import { CollegeDetailsPage } from "../pages/CollegeDetailsPage";
import { CollegesPage } from "../pages/CollegesPage";
import { GroupDetailsPage } from "../pages/GroupDetailsPage";
import { GroupsPage } from "../pages/GroupsPage";
import { HomePage } from "../pages/HomePage";
import { ModuleDetailsPage } from "../pages/ModuleDetailsPage";
import { ModulesPage } from "../pages/ModulesPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProfessionDetailsPage } from "../pages/ProfessionDetailsPage";
import { ProfessionsPage } from "../pages/ProfessionsPage";
import { StudentDetailsPage } from "../pages/StudentDetailsPage";
import { StudentCertificatesPage } from "../pages/student-cabinet/StudentCertificatesPage";
import { StudentDashboardPage } from "../pages/student-cabinet/StudentDashboardPage";
import { StudentEducationPage } from "../pages/student-cabinet/StudentEducationPage";
import { StudentLoginPage } from "../pages/student-cabinet/StudentLoginPage";
import { StudentProfilePage } from "../pages/student-cabinet/StudentProfilePage";
import { StudentSettingsPage } from "../pages/student-cabinet/StudentSettingsPage";
import {
  StudentCabinetNotFoundPage,
  StudentCollegesPage,
  StudentGroupsPage,
  StudentModulesPage,
} from "../pages/student-cabinet/StudentStudyPages";
import { StudentsPage } from "../pages/StudentsPage";
import { TeacherDetailsPage } from "../pages/TeacherDetailsPage";
import { TeachersPage } from "../pages/TeachersPage";
import { CabinetDashboardPage } from "../pages/teacher-cabinet/CabinetDashboardPage";
import { CabinetEducationPage } from "../pages/teacher-cabinet/CabinetEducationPage";
import { CabinetGroupsPage } from "../pages/teacher-cabinet/CabinetGroupsPage";
import { CabinetModulesPage } from "../pages/teacher-cabinet/CabinetModulesPage";
import { CabinetNotFoundPage } from "../pages/teacher-cabinet/CabinetNotFoundPage";
import { CabinetProfilePage } from "../pages/teacher-cabinet/CabinetProfilePage";
import { CabinetSettingsPage } from "../pages/teacher-cabinet/CabinetSettingsPage";
import { CabinetStudentsPage } from "../pages/teacher-cabinet/CabinetStudentsPage";
import { CabinetTrainingPage } from "../pages/teacher-cabinet/CabinetTrainingPage";
import { CabinetWorkExperiencePage } from "../pages/teacher-cabinet/CabinetWorkExperiencePage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="colleges" element={<CollegesPage />} />
        <Route path="colleges/:id" element={<CollegeDetailsPage />} />

        <Route path="professions" element={<ProfessionsPage />} />
        <Route path="professions/:id" element={<ProfessionDetailsPage />} />

        <Route path="modules" element={<ModulesPage />} />
        <Route path="modules/:id" element={<ModuleDetailsPage />} />

        <Route path="groups" element={<GroupsPage />} />
        <Route path="groups/:id" element={<GroupDetailsPage />} />

        <Route path="teachers" element={<TeachersPage />} />
        <Route path="teachers/:id" element={<TeacherDetailsPage />} />

        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* No auth guard yet — the cabinet shows a demo teacher until authentication is added. */}
      <Route path="teacher-cabinet" element={<TeacherCabinetLayout />}>
        <Route index element={<CabinetDashboardPage />} />
        <Route path="profile" element={<CabinetProfilePage />} />
        <Route path="work-experience" element={<CabinetWorkExperiencePage />} />
        <Route path="education" element={<CabinetEducationPage />} />
        <Route path="training" element={<CabinetTrainingPage />} />
        <Route path="groups" element={<CabinetGroupsPage />} />
        <Route path="modules" element={<CabinetModulesPage />} />
        <Route path="students" element={<CabinetStudentsPage />} />
        <Route path="settings" element={<CabinetSettingsPage />} />
        <Route path="*" element={<CabinetNotFoundPage />} />
      </Route>

      {/* Signed-in students only — the layout sends anyone without a token to the login page. */}
      <Route path="student-cabinet/login" element={<StudentLoginPage />} />
      <Route path="student-cabinet" element={<StudentCabinetLayout />}>
        <Route index element={<StudentDashboardPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="education" element={<StudentEducationPage />} />
        <Route path="certificates" element={<StudentCertificatesPage />} />
        <Route path="colleges" element={<StudentCollegesPage />} />
        <Route path="groups" element={<StudentGroupsPage />} />
        <Route path="modules" element={<StudentModulesPage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
        <Route path="*" element={<StudentCabinetNotFoundPage />} />
      </Route>
    </Routes>
  );
}
