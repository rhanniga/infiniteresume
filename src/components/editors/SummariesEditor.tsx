import React from 'react';
import type { Summary } from '../../types';
import './Editor.css';
import SummaryEditor from './SummaryEditor';

interface SummariesEditorProps {
  summaries: Summary[];
  onChange: (summaries: Summary[]) => void;
}

const SummariesEditor: React.FC<SummariesEditorProps> = ({ summaries, onChange }) => {
  const addSummary = () => {
    onChange([...summaries, { text: '', keywords: [] }]);
  };

  const removeSummary = (index: number) => {
    onChange(summaries.filter((_, i) => i !== index));
  };

  const updateSummary = (index: number, field: keyof Summary, value: string | string[]) => {
    const updated = summaries.map((summary, i) => 
      i === index ? { ...summary, [field]: value } : summary
    );
    onChange(updated);
  };

  return (
    <div className="editor">
      <h1>Summaries</h1>


      <div className="item-list">
        {summaries.map((summary, index) => (
          <SummaryEditor
            key={index}
            summary={summary}
            index={index}
            onChange={(field, value) => updateSummary(index, field, value)}
            onRemove={() => removeSummary(index)}
          />
        ))}
      </div>
      <button onClick={addSummary} className="add-button">
        +
      </button>
    </div>
  );
};

export default SummariesEditor;
