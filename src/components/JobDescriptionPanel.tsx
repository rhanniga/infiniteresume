import React from 'react';
import type { Resume } from '../types';
import { optimizeResume } from '../utils/resumeOptimizer.ts';
import './JobDescriptionPanel.css';

interface JobDescriptionPanelProps {
  jobDescription: string;
  setJobDescription: (description: string) => void;
  resume: Resume;
  onOptimize: (optimizedResume: Resume) => void;
  onPreview: (isPreview: boolean) => void;
}

const JobDescriptionPanel: React.FC<JobDescriptionPanelProps> = ({
  jobDescription,
  setJobDescription,
  resume,
  onOptimize,
  onPreview
}) => {
  const handleOptimize = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description first');
      return;
    }

    const optimized = optimizeResume(resume, jobDescription);
    onOptimize(optimized);
    onPreview(true);
  };

  return (
    <div className="job-description-panel">
      <div className="panel-content">
        <h2>Job Description</h2>
        <p>Paste the job description below to generate an optimized resume:</p>
        
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="job-description-input"
        />
        
        <button 
          onClick={handleOptimize}
          className="optimize-button"
          disabled={!jobDescription.trim()}
        >
          Generate Optimal Resume
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionPanel;
