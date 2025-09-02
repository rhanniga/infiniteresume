import React, { useState } from 'react';
import type { Job, Bullet } from '../../types';
import './Editor.css';

interface JobsEditorProps {
  jobs: Job[];
  onChange: (jobs: Job[]) => void;
}

const JobsEditor: React.FC<JobsEditorProps> = ({ jobs, onChange }) => {
  const [newKeyword, setNewKeyword] = useState<Record<string, string>>({});

  const addJob = () => {
    const newJob: Job = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: []
    };
    onChange([...jobs, newJob]);
  };

  const removeJob = (index: number) => {
    onChange(jobs.filter((_, i) => i !== index));
  };

  const updateJob = (index: number, field: keyof Job, value: string | Bullet[]) => {
    const updated = jobs.map((job, i) => 
      i === index ? { ...job, [field]: value } : job
    );
    onChange(updated);
  };

  const addBullet = (jobIndex: number) => {
    const newBullet: Bullet = { text: '', keywords: [] };
    const updated = [...jobs[jobIndex].bullets, newBullet];
    updateJob(jobIndex, 'bullets', updated);
  };

  const removeBullet = (jobIndex: number, bulletIndex: number) => {
    const updated = jobs[jobIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateJob(jobIndex, 'bullets', updated);
  };

  const updateBullet = (jobIndex: number, bulletIndex: number, field: keyof Bullet, value: string | string[]) => {
    const updated = jobs[jobIndex].bullets.map((bullet, i) => 
      i === bulletIndex ? { ...bullet, [field]: value } : bullet
    );
    updateJob(jobIndex, 'bullets', updated);
  };

  const addKeyword = (jobIndex: number, bulletIndex: number) => {
    const keywordKey = `${jobIndex}-${bulletIndex}`;
    const keyword = newKeyword[keywordKey]?.trim();
    if (keyword && !jobs[jobIndex].bullets[bulletIndex].keywords.includes(keyword)) {
      const updated = [...jobs[jobIndex].bullets[bulletIndex].keywords, keyword];
      updateBullet(jobIndex, bulletIndex, 'keywords', updated);
      setNewKeyword({ ...newKeyword, [keywordKey]: '' });
    }
  };

  const removeKeyword = (jobIndex: number, bulletIndex: number, keywordIndex: number) => {
    const updated = jobs[jobIndex].bullets[bulletIndex].keywords.filter((_, i) => i !== keywordIndex);
    updateBullet(jobIndex, bulletIndex, 'keywords', updated);
  };

  return (
    <div className="editor">
      <h1>Work Experience</h1>
      <p>Add your work experience with detailed bullets and keywords for each role.</p>
      
      <button onClick={addJob} className="add-button">
        + Add Job
      </button>

      <div className="item-list">
        {jobs.map((job, jobIndex) => (
          <div key={jobIndex} className="item">
            <div className="item-header">
              <h3 className="item-title">
                {job.title || 'New Position'} {job.company && `at ${job.company}`}
              </h3>
              <button 
                onClick={() => removeJob(jobIndex)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={job.title}
                  onChange={(e) => updateJob(jobIndex, 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) => updateJob(jobIndex, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={job.location || ''}
                  onChange={(e) => updateJob(jobIndex, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={job.startDate}
                  onChange={(e) => updateJob(jobIndex, 'startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={job.endDate}
                onChange={(e) => updateJob(jobIndex, 'endDate', e.target.value)}
              />
            </div>

            <div className="bullets-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>Accomplishments & Responsibilities</h4>
                <button 
                  onClick={() => addBullet(jobIndex)}
                  className="add-button"
                  style={{ margin: 0, padding: '8px 16px', fontSize: '12px' }}
                >
                  + Add Bullet
                </button>
              </div>

              {job.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="bullet-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <label style={{ margin: 0 }}>Bullet {bulletIndex + 1}</label>
                    <button 
                      onClick={() => removeBullet(jobIndex, bulletIndex)}
                      className="remove-button"
                      style={{ padding: '4px 8px', fontSize: '10px' }}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      value={bullet.text}
                      onChange={(e) => updateBullet(jobIndex, bulletIndex, 'text', e.target.value)}
                      placeholder="Describe your accomplishment or responsibility..."
                      rows={2}
                    />
                  </div>

                  <div className="keywords-container">
                    <label>Keywords</label>
                    <div className="keywords-input-container">
                      <input
                        className="keywords-input"
                        type="text"
                        value={newKeyword[`${jobIndex}-${bulletIndex}`] || ''}
                        onChange={(e) => setNewKeyword({ ...newKeyword, [`${jobIndex}-${bulletIndex}`]: e.target.value })}
                        placeholder="Add a keyword..."
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword(jobIndex, bulletIndex)}
                      />
                      <button 
                        onClick={() => addKeyword(jobIndex, bulletIndex)}
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
                            onClick={() => removeKeyword(jobIndex, bulletIndex, keywordIndex)}
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

export default JobsEditor;
