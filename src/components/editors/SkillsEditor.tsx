import React from 'react';
import type { Skill } from '../../types';
import './Editor.css';

interface SkillsEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills, onChange }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      name: '',
      experience: 'skilled'
    };
    onChange([...skills, newSkill]);
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const updated = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange(updated);
  };

  return (
    <div className="editor">
      <h1>Skills</h1>
      <p>Add your technical and professional skills with your experience level.</p>
      
      <button onClick={addSkill} className="add-button">
        + Add Skill
      </button>

      <div className="item-list">
        {skills.map((skill, index) => (
          <div key={index} className="item">
            <div className="item-header">
              <h3 className="item-title">
                {skill.name || 'New Skill'}
              </h3>
              <button 
                onClick={() => removeSkill(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  placeholder="JavaScript, Project Management, etc."
                />
              </div>
              <div className="form-group">
                <label>Experience Level</label>
                <select
                  value={skill.experience}
                  onChange={(e) => updateSkill(index, 'experience', e.target.value as Skill['experience'])}
                >
                  <option value="skilled">Skilled</option>
                  <option value="experienced">Experienced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsEditor;
