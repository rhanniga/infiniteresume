import React, { useState } from 'react';
import type { Project, Bullet } from '../../types';
import './Editor.css';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onChange }) => {
  const [newKeyword, setNewKeyword] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: Project = {
      name: '',
      link: '',
      bullets: []
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string | Bullet[]) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    onChange(updated);
  };

  const addBullet = (projectIndex: number) => {
    const newBullet: Bullet = { text: '', keywords: [] };
    const updated = [...projects[projectIndex].bullets, newBullet];
    updateProject(projectIndex, 'bullets', updated);
  };

  const removeBullet = (projectIndex: number, bulletIndex: number) => {
    const updated = projects[projectIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateProject(projectIndex, 'bullets', updated);
  };

  const updateBullet = (projectIndex: number, bulletIndex: number, field: keyof Bullet, value: string | string[]) => {
    const updated = projects[projectIndex].bullets.map((bullet, i) => 
      i === bulletIndex ? { ...bullet, [field]: value } : bullet
    );
    updateProject(projectIndex, 'bullets', updated);
  };

  const addKeyword = (projectIndex: number, bulletIndex: number) => {
    const keywordKey = `${projectIndex}-${bulletIndex}`;
    const keyword = newKeyword[keywordKey]?.trim();
    if (keyword && !projects[projectIndex].bullets[bulletIndex].keywords.includes(keyword)) {
      const updated = [...projects[projectIndex].bullets[bulletIndex].keywords, keyword];
      updateBullet(projectIndex, bulletIndex, 'keywords', updated);
      setNewKeyword({ ...newKeyword, [keywordKey]: '' });
    }
  };

  const removeKeyword = (projectIndex: number, bulletIndex: number, keywordIndex: number) => {
    const updated = projects[projectIndex].bullets[bulletIndex].keywords.filter((_, i) => i !== keywordIndex);
    updateBullet(projectIndex, bulletIndex, 'keywords', updated);
  };

  return (
    <div className="editor">
      <h1>Projects</h1>
      <p>Add personal or professional projects that showcase your skills and experience.</p>
      
      <button onClick={addProject} className="add-button">
        + Add Project
      </button>

      <div className="item-list">
        {projects.map((project, projectIndex) => (
          <div key={projectIndex} className="item">
            <div className="item-header">
              <h3 className="item-title">
                {project.name || 'New Project'}
              </h3>
              <button 
                onClick={() => removeProject(projectIndex)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(projectIndex, 'name', e.target.value)}
                  placeholder="My Awesome Project"
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(projectIndex, 'link', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div className="bullets-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>Project Details</h4>
                <button 
                  onClick={() => addBullet(projectIndex)}
                  className="add-button"
                  style={{ margin: 0, padding: '8px 16px', fontSize: '12px' }}
                >
                  + Add Detail
                </button>
              </div>

              {project.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="bullet-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <label style={{ margin: 0 }}>Detail {bulletIndex + 1}</label>
                    <button 
                      onClick={() => removeBullet(projectIndex, bulletIndex)}
                      className="remove-button"
                      style={{ padding: '4px 8px', fontSize: '10px' }}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      value={bullet.text}
                      onChange={(e) => updateBullet(projectIndex, bulletIndex, 'text', e.target.value)}
                      placeholder="Describe what you built, technologies used, or impact achieved..."
                      rows={2}
                    />
                  </div>

                  <div className="keywords-container">
                    <label>Keywords</label>
                    <div className="keywords-input-container">
                      <input
                        className="keywords-input"
                        type="text"
                        value={newKeyword[`${projectIndex}-${bulletIndex}`] || ''}
                        onChange={(e) => setNewKeyword({ ...newKeyword, [`${projectIndex}-${bulletIndex}`]: e.target.value })}
                        placeholder="Add a keyword..."
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword(projectIndex, bulletIndex)}
                      />
                      <button 
                        onClick={() => addKeyword(projectIndex, bulletIndex)}
                        className="add-keyword-button"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="keywords-list">
                      {bullet.keywords.map((keyword, keywordIndex) => (
                        <span key={keywordIndex} className="keyword-tag">
                          {keyword}
                          <button
                            onClick={() => removeKeyword(projectIndex, bulletIndex, keywordIndex)}
                            className="keyword-remove"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsEditor;
