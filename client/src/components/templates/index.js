import ResumeTemplateOne from './ResumeTemplateOne';
import ResumeTemplateTwo from './ResumeTemplateTwo';
import ResumeTemplateThree from './ResumeTemplateThree';
import ResumeTemplateFour from './ResumeTemplateFour';
import ResumeTemplateFive from './ResumeTemplateFive';
import ResumeTemplateSix from './ResumeTemplateSix';

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
    id: 'four',
    name: 'Sidebar',
    description: 'Left-sidebar layout with contact and skills emphasized',
    component: ResumeTemplateFour
  },
  {
    id: 'five',
    name: 'Accent',
    description: 'Typography-forward design with color accents',
    component: ResumeTemplateFive
  },
  {
    id: 'six',
    name: 'Split',
    description: 'Split header and two-column content for clarity',
    component: ResumeTemplateSix
  }
];

export { ResumeTemplateOne, ResumeTemplateTwo, ResumeTemplateThree, ResumeTemplateFour, ResumeTemplateFive, ResumeTemplateSix };
