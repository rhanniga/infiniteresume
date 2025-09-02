import React from 'react';
import type { Resume, SidebarSection } from '../types.ts';
import ContactInfoEditor from './editors/ContactInfoEditor.tsx';
import SummariesEditor from './editors/SummariesEditor.tsx';
import JobsEditor from './editors/JobsEditor.tsx';
import ProjectsEditor from './editors/ProjectsEditor.tsx';
import EducationsEditor from './editors/EducationsEditor.tsx';
import SkillsEditor from './editors/SkillsEditor.tsx';
import './EditorPanel.css';

interface EditorPanelProps {
  resume: Resume;
  setResume: (resume: Resume) => void;
  activeSection: SidebarSection;
}

const EditorPanelProps: React.FC<EditorPanelProps> = ({ resume, setResume, activeSection }) => {
  const renderEditor = () => {
    switch (activeSection) {
      case 'contactInfo':
        return (
          <ContactInfoEditor
            contactInfo={resume.contactInfo}
            onChange={(contactInfo: typeof resume.contactInfo) => setResume({ ...resume, contactInfo })}
          />
        );
      case 'summaries':
        return (
          <SummariesEditor
            summaries={resume.summaries}
            onChange={(summaries: typeof resume.summaries) => setResume({ ...resume, summaries })}
          />
        );
      case 'jobs':
        return (
          <JobsEditor
            jobs={resume.jobs}
            onChange={(jobs: typeof resume.jobs) => setResume({ ...resume, jobs })}
          />
        );
      case 'projects':
        return (
          <ProjectsEditor
            projects={resume.projects}
            onChange={(projects: typeof resume.projects) => setResume({ ...resume, projects })}
          />
        );
      case 'educations':
        return (
          <EducationsEditor
            educations={resume.educations}
            onChange={(educations: typeof resume.educations) => setResume({ ...resume, educations })}
          />
        );
      case 'skills':
        return (
          <SkillsEditor
            skills={resume.skills}
            onChange={(skills: typeof resume.skills) => setResume({ ...resume, skills })}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <main className="editor-panel">
      {renderEditor()}
    </main>
  );
};

export default EditorPanelProps;
