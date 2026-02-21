import { useState } from "react";
import CVPreview from "./components/CVPreview";
import EducationSection from "./components/EducationSection";
import GeneralInfoSection from "./components/GeneralInfoSection";
import PracticalExperienceSection from "./components/PracticalExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import VolunteerSection from "./components/VolunteerSection";
import "./styles/App.css";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [education, setEducation] = useState({
    schoolName: "",
    studyTitle: "",
    studyDate: "",
  });

  const [practical, setPractical] = useState({
    companyName: "",
    positionTitle: "",
    responsibilities: "",
    dateFrom: "",
    dateUntil: "",
  });

  const [projects, setProjects] = useState({
    projectName: "",
    projectRole: "",
    projectDescription: "",
    technologies: "",
    projectDate: "",
  });

  const [volunteer, setVolunteer] = useState({
    organizationName: "",
    volunteerRole: "",
    volunteerResponsibilities: "",
    volunteerDateFrom: "",
    volunteerDateUntil: "",
  });

  const [isEditing, setIsEditing] = useState({
    generalInfo: true,
    education: true,
    practical: true,
    projects: true,
    volunteer: true,
  });

  const handleChange = (setter) => (event) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (section) => (event) => {
    event.preventDefault();
    setIsEditing((prev) => ({ ...prev, [section]: false }));
  };

  const handleEdit = (section) => () => {
    setIsEditing((prev) => ({ ...prev, [section]: true }));
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>CV Application</h1>
        <p>
          Fill each section, submit, then use the live preview to see how your
          CV will look.
        </p>
      </header>

      <div className="app-layout">
        <div className="sections-grid">
          <GeneralInfoSection
            data={generalInfo}
            isEditing={isEditing.generalInfo}
            onChange={handleChange(setGeneralInfo)}
            onSubmit={handleSubmit("generalInfo")}
            onEdit={handleEdit("generalInfo")}
          />

          <EducationSection
            data={education}
            isEditing={isEditing.education}
            onChange={handleChange(setEducation)}
            onSubmit={handleSubmit("education")}
            onEdit={handleEdit("education")}
          />

          <PracticalExperienceSection
            data={practical}
            isEditing={isEditing.practical}
            onChange={handleChange(setPractical)}
            onSubmit={handleSubmit("practical")}
            onEdit={handleEdit("practical")}
          />

          <ProjectsSection
            data={projects}
            isEditing={isEditing.projects}
            onChange={handleChange(setProjects)}
            onSubmit={handleSubmit("projects")}
            onEdit={handleEdit("projects")}
          />

          <VolunteerSection
            data={volunteer}
            isEditing={isEditing.volunteer}
            onChange={handleChange(setVolunteer)}
            onSubmit={handleSubmit("volunteer")}
            onEdit={handleEdit("volunteer")}
          />
        </div>

        <CVPreview
          generalInfo={generalInfo}
          education={education}
          practical={practical}
          projects={projects}
          volunteer={volunteer}
        />
      </div>
    </main>
  );
}

export default App;
