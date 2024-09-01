import CertificationsSection from "@/components/resumeBuilder/CertificationsSection";
import EducationSection from "@/components/resumeBuilder/EducationSection";
import ExperienceSection from "@/components/resumeBuilder/ExperienceSection";
import ProfileSection from "@/components/resumeBuilder/ProfileSection";
import ProjectsSection from "@/components/resumeBuilder/ProjectsSection";
import SkillsSection from "@/components/resumeBuilder/SkillsSection";
import MyDocument from "@/resumeTemplates/Document";
import NormalTemplate from "@/resumeTemplates/NormalTemplate";
import { ResumeProfileSectionDummyData } from "./constants";

const Templates: Record<
  string,
  {
    name: string;
    component: React.FC<{ formData: typeof ResumeProfileSectionDummyData }>;
    image: string;
  }
> = {
  Normal: {
    name: "Normal",
    component: NormalTemplate,
    image: "/resumeImages/template1.webp",
  },
  Document: {
    name: "Document",
    component: MyDocument,
    image: "/resumeImages/template2.webp",
  },
};
export { Templates };

const Normal = [
  { step: 1, component: ProfileSection, key: "profile" },
  { step: 2, component: ExperienceSection, key: "experience" },
  { step: 3, component: EducationSection, key: "education" },
  { step: 4, component: SkillsSection, key: "skills" },
  { step: 5, component: CertificationsSection, key: "certifications" },
  { step: 6, component: ProjectsSection, key: "projects" },
];

export default Normal;

export const Document = [
  { step: 1, component: ProfileSection, key: "profile" },
  { step: 2, component: ExperienceSection, key: "experience" },
  { step: 3, component: EducationSection, key: "education" },
  { step: 4, component: SkillsSection, key: "skills" },
  { step: 5, component: CertificationsSection, key: "certifications" },
  { step: 6, component: ProjectsSection, key: "projects" },
];

export const templateConfigurations = {
  Normal: Normal,
  Document: Document,
};
