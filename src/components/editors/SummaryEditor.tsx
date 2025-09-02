import React, { useState } from 'react';
import type { Summary } from '../../types';
import './Editor.css';

interface SummaryEditorProps {
  summary: Summary;
  index: number;
  onChange: (field: keyof Summary, value: string | string[]) => void;
  onRemove: () => void;
}

const SummaryEditor: React.FC<SummaryEditorProps> = ({ 
  summary, 
  index, 
  onChange, 
  onRemove 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getPreviewText = (text: string, wordLimit = 8) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const getPreviewKeywords = (keywords: string[], limit = 3) => {
    if (keywords.length === 0) return [];
    if (keywords.length <= limit) return keywords;
    return keywords.slice(0, limit);
  };

  const addKeyword = () => {
    const keyword = newKeyword.trim();
    if (keyword && !summary.keywords.includes(keyword)) {
      const updated = [...summary.keywords, keyword];
      onChange('keywords', updated);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordIndex: number) => {
    const updated = summary.keywords.filter((_, i) => i !== keywordIndex);
    onChange('keywords', updated);
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const previewKeywords = getPreviewKeywords(summary.keywords);
  const hasMoreKeywords = summary.keywords.length > 3;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px' }}>
      <div className="summary-item" style={{ flex: 1 }}>
        <div className="item-header">
          <div 
            className="summary-preview" 
            style={{ 
              flex: 1, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onClick={toggleExpand}
          >
            <span className="expand-icon" style={{ 
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              fontWeight: 'bold'
            }}>
              ▶
            </span>
            <div style={{ flex: 1 , display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="summary-text">
                {summary.text ? getPreviewText(summary.text) : 'New summary...'}
              </span>
              
              {previewKeywords.length > 0 && (
                <div className="preview-keywords" style={{ 
                  display: 'flex', 
                  gap: '4px', 
                  alignItems: 'center'
                }}>
                  {previewKeywords.map((keyword, index) => (
                    <span key={index} className="preview-keyword-tag">
                      {keyword}
                    </span>
                  ))}
                  {hasMoreKeywords && (
                    <span className="preview-keyword-more">
                      +{summary.keywords.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            maxHeight: isExpanded ? '1000px' : '0',
            overflow: 'hidden',
            transition: 'none',
            opacity: isExpanded ? 1 : 0,
            paddingTop: isExpanded ? '15px' : '0',
            borderTop: isExpanded ? '1px solid light-dark(var(--light-color), var(--dark-color))' : 'none',
            marginTop: isExpanded ? '15px' : '0',
          }}
        >
        <div className="form-group">
          <label htmlFor={`summary-text-${index}`}>Summary Text</label>
          <textarea
            id={`summary-text-${index}`}
            value={summary.text}
            onChange={(e) => onChange('text', e.target.value)}
            placeholder="Enter your professional summary..."
            rows={4}
          />
        </div>

        <div className="keywords-container">
          <label>Keywords</label>
          <div className="keywords-input-container">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={handleKeywordKeyPress}
              placeholder="Add a keyword..."
              className="keywords-input"
            />
            <button 
              type="button"
              onClick={addKeyword}
              className="add-keyword-button"
            >
              Add
            </button>
          </div>

          {summary.keywords.length > 0 && (
            <div className="keywords-list">
              {summary.keywords.map((keyword, keywordIndex) => (
                <span key={keywordIndex} className="keyword-tag">
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keywordIndex)}
                    className="keyword-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
      
      <button 
        onClick={onRemove}
        className="remove-button"
        style={{ alignSelf: 'flex-start', marginTop: '20px', border: '0px' }}
      >
        Remove
      </button>
    </div>
  );
};

export default SummaryEditor;