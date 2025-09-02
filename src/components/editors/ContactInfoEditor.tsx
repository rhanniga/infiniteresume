import React from 'react';
import type { ContactInfo } from '../../types';
import './Editor.css';

interface ContactInfoEditorProps {
  contactInfo: ContactInfo;
  onChange: (contactInfo: ContactInfo) => void;
}

const ContactInfoEditor: React.FC<ContactInfoEditorProps> = ({ contactInfo, onChange }) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({
      ...contactInfo,
      [field]: value || undefined,
    });
  };

  return (
    <div className="editor">
      <h1>Contact Information</h1>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={contactInfo.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Full Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={contactInfo.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={contactInfo.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your.email@example.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="github">GitHub</label>
        <input
          id="github"
          type="text"
          value={contactInfo.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          id="linkedin"
          type="text"
          value={contactInfo.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={contactInfo.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="www.yoursite.com"
        />
      </div>
    </div>
  );
};

export default ContactInfoEditor;
