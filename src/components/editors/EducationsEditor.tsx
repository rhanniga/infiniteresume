import React, { useState } from 'react';
import type { Education, Bullet } from '../../types';
import './Editor.css';

interface EducationsEditorProps {
  educations: Education[];
  onChange: (educations: Education[]) => void;
}

const EducationsEditor: React.FC<EducationsEditorProps> = ({ educations, onChange }) => {
  const [newKeyword, setNewKeyword] = useState<Record<string, string>>({});

  const addEducation = () => {
    const newEducation: Education = {
      institution: '',
      location: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      bullets: []
    };
    onChange([...educations, newEducation]);
  };

  const removeEducation = (index: number) => {
    onChange(educations.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string | Bullet[]) => {
    const updated = educations.map((education, i) => 
      i === index ? { ...education, [field]: value } : education
    );
    onChange(updated);
  };

  const addBullet = (educationIndex: number) => {
    const newBullet: Bullet = { text: '', keywords: [] };
    const updated = [...educations[educationIndex].bullets, newBullet];
    updateEducation(educationIndex, 'bullets', updated);
  };

  const removeBullet = (educationIndex: number, bulletIndex: number) => {
    const updated = educations[educationIndex].bullets.filter((_, i) => i !== bulletIndex);
    updateEducation(educationIndex, 'bullets', updated);
  };

  const updateBullet = (educationIndex: number, bulletIndex: number, field: keyof Bullet, value: string | string[]) => {
    const updated = educations[educationIndex].bullets.map((bullet, i) => 
      i === bulletIndex ? { ...bullet, [field]: value } : bullet
    );
    updateEducation(educationIndex, 'bullets', updated);
  };

  const addKeyword = (educationIndex: number, bulletIndex: number) => {
    const keywordKey = `${educationIndex}-${bulletIndex}`;
    const keyword = newKeyword[keywordKey]?.trim();
    if (keyword && !educations[educationIndex].bullets[bulletIndex].keywords.includes(keyword)) {
      const updated = [...educations[educationIndex].bullets[bulletIndex].keywords, keyword];
      updateBullet(educationIndex, bulletIndex, 'keywords', updated);
      setNewKeyword({ ...newKeyword, [keywordKey]: '' });
    }
  };

  const removeKeyword = (educationIndex: number, bulletIndex: number, keywordIndex: number) => {
    const updated = educations[educationIndex].bullets[bulletIndex].keywords.filter((_, i) => i !== keywordIndex);
    updateBullet(educationIndex, bulletIndex, 'keywords', updated);
  };

  return (
    <div className="editor">
      <h1>Education</h1>
      <p>Add your educational background including degrees, certifications, and achievements.</p>
      
      <button onClick={addEducation} className="add-button">
        + Add Education
      </button>

      <div className="item-list">
        {educations.map((education, educationIndex) => (
          <div key={educationIndex} className="item">
            <div className="item-header">
              <h3 className="item-title">
                {education.degree || 'New Degree'} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
              </h3>
              <button 
                onClick={() => removeEducation(educationIndex)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Institution</label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => updateEducation(educationIndex, 'institution', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={education.location}
                  onChange={(e) => updateEducation(educationIndex, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => updateEducation(educationIndex, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  value={education.fieldOfStudy}
                  onChange={(e) => updateEducation(educationIndex, 'fieldOfStudy', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={education.startDate}
                  onChange={(e) => updateEducation(educationIndex, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={education.endDate}
                  onChange={(e) => updateEducation(educationIndex, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="bullets-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>Achievements & Details</h4>
                <button 
                  onClick={() => addBullet(educationIndex)}
                  className="add-button"
                  style={{ margin: 0, padding: '8px 16px', fontSize: '12px' }}
                >
                  + Add Detail
                </button>
              </div>

              {education.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="bullet-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <label style={{ margin: 0 }}>Detail {bulletIndex + 1}</label>
                    <button 
                      onClick={() => removeBullet(educationIndex, bulletIndex)}
                      className="remove-button"
                      style={{ padding: '4px 8px', fontSize: '10px' }}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      value={bullet.text}
                      onChange={(e) => updateBullet(educationIndex, bulletIndex, 'text', e.target.value)}
                      placeholder="GPA, honors, relevant coursework, etc..."
                      rows={2}
                    />
                  </div>

                  <div className="keywords-container">
                    <label>Keywords</label>
                    <div className="keywords-input-container">
                      <input
                        className="keywords-input"
                        type="text"
                        value={newKeyword[`${educationIndex}-${bulletIndex}`] || ''}
                        onChange={(e) => setNewKeyword({ ...newKeyword, [`${educationIndex}-${bulletIndex}`]: e.target.value })}
                        placeholder="Add a keyword..."
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword(educationIndex, bulletIndex)}
                      />
                      <button 
                        onClick={() => addKeyword(educationIndex, bulletIndex)}
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
                            onClick={() => removeKeyword(educationIndex, bulletIndex, keywordIndex)}
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

export default EducationsEditor;
