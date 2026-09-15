import { Route, Routes } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
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
import { StudentsPage } from "../pages/StudentsPage";
import { TeacherDetailsPage } from "../pages/TeacherDetailsPage";
import { TeachersPage } from "../pages/TeachersPage";

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
    </Routes>
  );
}
