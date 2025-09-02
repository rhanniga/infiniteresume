import type { Resume, Summary, Job, Project, Education, Bullet, ScoredItem } from '../types';
import knownKeywords from '../data/knownKeywords.json';

const MAX_SUMMARIES = 1;
const MAX_JOBS = 3;
const MAX_PROJECTS = 3;
const MAX_EDUCATIONS = 2;
const MAX_BULLETS_PER_JOB = 4;
const MAX_BULLETS_PER_PROJECT = 3;
const MAX_BULLETS_PER_EDUCATION = 2;

// Extract keywords from job description
function extractKeywordsFromText(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  
  const foundKeywords = new Set<string>();
  
  // Check for exact keyword matches (case insensitive)
  knownKeywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords.add(keyword);
    }
  });
  
  // Also add individual words that are in our known keywords
  words.forEach(word => {
    const match = knownKeywords.find(k => k.toLowerCase() === word);
    if (match) {
      foundKeywords.add(match);
    }
  });
  
  return Array.from(foundKeywords);
}

// Score an item based on keyword matches and text relevance
function scoreItem(
  item: Summary | Job | Project | Education | Bullet,
  jobKeywords: string[],
  jobDescription: string
): number {
  let score = 0;
  const itemText = 'text' in item ? item.text : '';
  let itemKeywords: string[] = [];
  
  // Get keywords based on item type
  if ('keywords' in item) {
    itemKeywords = item.keywords;
  }
  
  // Score based on keyword matches
  itemKeywords.forEach((keyword: string) => {
    if (jobKeywords.some(jk => jk.toLowerCase().includes(keyword.toLowerCase()) || 
                              keyword.toLowerCase().includes(jk.toLowerCase()))) {
      score += 5;
    }
  });
  
  // Score based on text content matches
  jobKeywords.forEach((keyword: string) => {
    if (itemText.toLowerCase().includes(keyword.toLowerCase())) {
      score += 3;
    }
  });
  
  // Bonus for exact matches in job description
  const textWords = itemText.toLowerCase().split(/\s+/);
  textWords.forEach(word => {
    if (word.length > 3 && jobDescription.toLowerCase().includes(word)) {
      score += 1;
    }
  });
  
  return score;
}

// Score bullets for jobs/projects/education
function scoreBullets(bullets: Bullet[], jobKeywords: string[], jobDescription: string): ScoredItem[] {
  return bullets
    .map(bullet => ({
      item: bullet,
      score: scoreItem(bullet, jobKeywords, jobDescription),
      keywordMatches: bullet.keywords.filter(k => 
        jobKeywords.some(jk => jk.toLowerCase().includes(k.toLowerCase()) || 
                              k.toLowerCase().includes(jk.toLowerCase()))
      )
    }))
    .sort((a, b) => b.score - a.score);
}

export function optimizeResume(resume: Resume, jobDescription: string): Resume {
  const jobKeywords = extractKeywordsFromText(jobDescription);
  
  // Score and select summaries
  const scoredSummaries = resume.summaries
    .map(summary => ({
      item: summary,
      score: scoreItem(summary, jobKeywords, jobDescription),
      keywordMatches: summary.keywords.filter(k => 
        jobKeywords.some(jk => jk.toLowerCase().includes(k.toLowerCase()) || 
                              k.toLowerCase().includes(jk.toLowerCase()))
      )
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SUMMARIES);
  
  // Score and select jobs
  const scoredJobs = resume.jobs
    .map(job => {
      const jobScore = scoreItem(job, jobKeywords, jobDescription);
      const bulletScores = scoreBullets(job.bullets, jobKeywords, jobDescription);
      const totalScore = jobScore + bulletScores.reduce((sum, b) => sum + b.score, 0);
      
      return {
        item: {
          ...job,
          bullets: bulletScores.slice(0, MAX_BULLETS_PER_JOB).map(b => b.item)
        },
        score: totalScore,
        keywordMatches: []
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_JOBS);
  
  // Score and select projects
  const scoredProjects = resume.projects
    .map(project => {
      const projectScore = scoreItem(project, jobKeywords, jobDescription);
      const bulletScores = scoreBullets(project.bullets, jobKeywords, jobDescription);
      const totalScore = projectScore + bulletScores.reduce((sum, b) => sum + b.score, 0);
      
      return {
        item: {
          ...project,
          bullets: bulletScores.slice(0, MAX_BULLETS_PER_PROJECT).map(b => b.item)
        },
        score: totalScore,
        keywordMatches: []
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_PROJECTS);
  
  // Score and select education
  const scoredEducations = resume.educations
    .map(education => {
      const educationScore = scoreItem(education, jobKeywords, jobDescription);
      const bulletScores = scoreBullets(education.bullets, jobKeywords, jobDescription);
      const totalScore = educationScore + bulletScores.reduce((sum, b) => sum + b.score, 0);
      
      return {
        item: {
          ...education,
          bullets: bulletScores.slice(0, MAX_BULLETS_PER_EDUCATION).map(b => b.item)
        },
        score: totalScore,
        keywordMatches: []
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_EDUCATIONS);
  
  // Keep all skills (they don't take much space)
  return {
    contactInfo: resume.contactInfo,
    summaries: scoredSummaries.map(s => s.item),
    jobs: scoredJobs.map(j => j.item),
    projects: scoredProjects.map(p => p.item),
    educations: scoredEducations.map(e => e.item),
    skills: resume.skills
  };
}
