import ResumeTemplateOne from './ResumeTemplateOne';
import ResumeTemplateTwo from './ResumeTemplateTwo';
import ResumeTemplateThree from './ResumeTemplateThree';

export const TEMPLATES = [
  { 
    id: 'one', 
    name: 'Classic', 
    description: 'Traditional format with clean lines and professional styling',
    component: ResumeTemplateOne
  },
  { 
    id: 'two', 
    name: 'Modern', 
    description: 'Contemporary design with colors and icons',
    component: ResumeTemplateTwo
  },
  { 
    id: 'three', 
    name: 'Minimal', 
    description: 'Clean and simple design with focus on typography',
    component: ResumeTemplateThree
  },
  { 
    id: 'one', 
    name: 'Classic', 
    description: 'Traditional format with clean lines and professional styling',
    component: ResumeTemplateFour
  },
  { 
    id: 'two', 
    name: 'Modern', 
    description: 'Contemporary design with colors and icons',
    component: ResumeTemplateFive
  },
  { 
    id: 'three', 
    name: 'Minimal', 
    description: 'Clean and simple design with focus on typography',
    component: ResumeTemplateSix
  },
];

export { ResumeTemplateOne, ResumeTemplateTwo, ResumeTemplateThree, ResumeTemplateFour, ResumeTemplateFive, ResumeTemplateSix };
