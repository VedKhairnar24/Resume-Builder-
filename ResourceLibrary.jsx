import React from 'react';
import { BookOpen, Briefcase, TrendingUp, Wrench, Download, ExternalLink } from 'lucide-react';

const foundations = [
  {
    title: 'How to Choose a Career Path',
    description: 'Learn how to identify your strengths, explore industries, and align your skills with meaningful opportunities.',
  },
  {
    title: 'Finding the Right Fit',
    description: 'Understand how to match your personality, values, and goals with the right role or company.',
  },
  {
    title: 'Building Confidence in Your Career Decisions',
    description: 'Tools and exercises to help you plan your journey and take the next step with clarity.',
  },
];

const readiness = [
  {
    title: 'What to Expect at Your First Job',
    description: 'Insights on professional etiquette, communication, teamwork, and managing expectations in your first role.',
  },
  {
    title: 'Adapting to Company Culture',
    description: 'Learn how to navigate office dynamics and find your place in a new environment.',
  },
  {
    title: 'Balancing Work and Growth',
    description: 'Tips on managing stress, setting goals, and learning continuously on the job.',
  },
];

const advancement = [
  {
    title: 'How to Negotiate Salary & Benefits',
    description: 'Step-by-step guidance on discussing pay confidently and understanding compensation packages.',
  },
  {
    title: 'Building Professional Relationships',
    description: 'Learn effective networking, mentorship, and collaboration strategies.',
  },
  {
    title: 'Setting Career Goals',
    description: 'Frameworks and templates to track progress, measure success, and stay motivated.',
  },
];

const tools = [
  {
    emoji: '🧠',
    name: 'GeeksforGeeks',
    description: 'Master programming concepts and interview questions with structured tutorials and coding challenges.',
    link: 'https://www.geeksforgeeks.org/',
  },
  {
    emoji: '🌐',
    name: 'W3Schools',
    description: 'Learn web development step by step — HTML, CSS, JavaScript, and more with live coding examples.',
    link: 'https://www.w3schools.com/',
  },
  {
    emoji: '💻',
    name: 'LeetCode',
    description: 'Sharpen your problem-solving and algorithm skills through coding challenges and mock interviews.',
    link: 'https://leetcode.com/',
  },
  {
    emoji: '🧩',
    name: 'FreeCodeCamp',
    description: 'Build real projects and earn certifications in web development and data science.',
    link: 'https://www.freecodecamp.org/',
  },
  {
    emoji: '⚙️',
    name: 'Roadmap.sh',
    description: 'Visual learning paths for developers — front-end, back-end, DevOps, and more.',
    link: 'https://roadmap.sh/',
  },
  {
    emoji: '🏗️',
    name: 'Frontend Mentor',
    description: 'Practice by building real-world UI challenges to improve design and coding skills.',
    link: 'https://www.frontendmentor.io/',
  },
];

const ResourceSection = ({ icon, title, items }) => (
  <section>
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      {icon} {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg font-sans  text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const ToolCard = ({ emoji, name, description, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-xl text-gray-800 flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        {name}
      </h3>
      <ExternalLink className="w-5 h-5 text-gray-400" />
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </a>
);

const ResourceLibrary = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Resource Library</h1>
          <p className="text-lg font-sans  text-gray-600 max-w-3xl mx-auto">
            A practical learning space packed with clear, beginner-friendly guides to help you make informed career decisions and grow confidently at every stage.
          </p>
        </header>

        <main className="space-y-16">
          <ResourceSection
            icon={<BookOpen className="w-8 h-8 text-blue-500" />}
            title="Career Foundations"
            items={foundations}
          />

          <ResourceSection
            icon={<Briefcase className="w-8 h-8 text-green-500" />}
            title="Workplace Readiness"
            items={readiness}
          />

          <ResourceSection
            icon={<TrendingUp className="w-8 h-8 text-purple-500" />}
            title="Career Advancement"
            items={advancement}
          />

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Wrench className="w-8 h-8 text-yellow-500" /> Growth Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
            <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-sans  font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Download className="w-5 h-5" /> Additional Resources
                </h3>
                <div className="text-blue-800 space-y-2 text-sm">
                    <p>• Downloadable templates, worksheets, and checklists for planning, negotiation, and career reflection.</p>
                    <p>• Curated reading lists, podcasts, and videos from trusted professional sources.</p>
                </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResourceLibrary;