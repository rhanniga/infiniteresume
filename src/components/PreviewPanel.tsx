import React from 'react';
import type { Resume } from '../types';
import './PreviewPanel.css';

interface PreviewPanelProps {
  resume: Resume;
  onBack: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ resume, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="resume-preview-container">
      <div className="preview-controls no-print">
        <button onClick={onBack} className="back-button">
          ← Back to Editor
        </button>
        <button onClick={handlePrint} className="print-button">
          📄 Save as PDF
        </button>
      </div>

      <div className="resume-content">
        {/* Header */}
        <header className="resume-header">
          <h1>{resume.contactInfo.name}</h1>
          <div className="contact-info">
            {resume.contactInfo.phone && <span>{resume.contactInfo.phone}</span>}
            {resume.contactInfo.email && <span>{resume.contactInfo.email}</span>}
            {resume.contactInfo.github && <span>github.com/{resume.contactInfo.github}</span>}
            {resume.contactInfo.linkedin && <span>linkedin.com/in/{resume.contactInfo.linkedin}</span>}
            {resume.contactInfo.website && <span>{resume.contactInfo.website}</span>}
          </div>
        </header>

        {/* Summary */}
        {resume.summaries.length > 0 && (
          <section className="resume-section">
            <h2>Professional Summary</h2>
            {resume.summaries.map((summary, index) => (
              <p key={index} className="summary-text">{summary.text}</p>
            ))}
          </section>
        )}

        {/* Experience */}
        {resume.jobs.length > 0 && (
          <section className="resume-section">
            <h2>Professional Experience</h2>
            {resume.jobs.map((job, index) => (
              <div key={index} className="job-item">
                <div className="job-header">
                  <div className="job-title-company">
                    <h3>{job.title}</h3>
                    <span className="company">{job.company}</span>
                    {job.location && <span className="location">{job.location}</span>}
                  </div>
                  <div className="job-dates">
                    {formatDate(job.startDate)} - {formatDate(job.endDate)}
                  </div>
                </div>
                {job.bullets.length > 0 && (
                  <ul className="job-bullets">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {resume.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  {project.link && <span className="project-link">{project.link}</span>}
                </div>
                {project.bullets.length > 0 && (
                  <ul className="project-bullets">
                    {project.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.educations.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {resume.educations.map((education, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <div className="education-degree-school">
                    <h3>{education.degree} in {education.fieldOfStudy}</h3>
                    <span className="institution">{education.institution}</span>
                    {education.location && <span className="location">{education.location}</span>}
                  </div>
                  <div className="education-dates">
                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                  </div>
                </div>
                {education.bullets.length > 0 && (
                  <ul className="education-bullets">
                    {education.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {['expert', 'experienced', 'skilled'].map(level => {
                const skillsAtLevel = resume.skills.filter(skill => skill.experience === level);
                if (skillsAtLevel.length === 0) return null;
                
                return (
                  <div key={level} className="skills-group">
                    <h4>{level.charAt(0).toUpperCase() + level.slice(1)}</h4>
                    <div className="skills-list">
                      {skillsAtLevel.map((skill, index) => (
                        <span key={index} className="skill-item">{skill.name}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
