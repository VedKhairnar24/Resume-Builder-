import React, { useState } from 'react';

// Placeholder components for each tab
const LinkedInAnalyzer = () => (
  <div>
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Quick Analysis</h3>
        <span className="ml-3 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">Coming Soon</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter your LinkedIn Profile URL"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled
        />
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled
        >
          Analyze Profile
        </button>
      </div>
    </div>

    <div className="relative mt-8">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
            <span className="px-4 py-2 bg-yellow-200 text-yellow-800 text-lg font-semibold rounded-full">Coming Soon</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 blur-sm">
            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Overall Profile Strength</h3>
                <p className="text-5xl font-bold text-blue-600">78<span className="text-3xl text-gray-500">/100</span></p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
                </div>
                <p className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">Good - A few improvements will make it stand out.</p>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-gray-800 mb-4">Section Breakdown</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center"><span>Profile Photo</span><span className="font-bold">8/10 ✅</span></li>
                    <li className="flex justify-between items-center"><span>Headline</span><span className="font-bold text-yellow-600">6/10 ⚠️</span></li>
                    <li className="flex justify-between items-center"><span>About Section</span><span className="font-bold text-red-600">4/10 ❌</span></li>
                    <li className="flex justify-between items-center"><span>Experience</span><span className="font-bold">8/10 ✅</span></li>
                    <li className="flex justify-between items-center"><span>Skills</span><span className="font-bold text-yellow-600">7/10 ⚠️</span></li>
                    <li className="flex justify-between items-center"><span>Education</span><span className="font-bold">10/10 ✅</span></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">LinkedIn Optimization Guide</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quick Tip</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {[
              { section: 'Profile Photo', points: 10, focus: 'Clear, professional headshot', tip: 'Use a clean, well-lit photo in professional attire.' },
              { section: 'Headline', points: 10, focus: 'Beyond job title, includes keywords', tip: 'Example: “Software Engineer | React & Java | Problem Solver.”' },
              { section: 'About/Summary', points: 15, focus: '3+ sentences, first person, goals & skills', tip: 'Write 2–3 short paragraphs about who you are and what you do.' },
              { section: 'Experience', points: 20, focus: '2+ roles, action verbs, results', tip: 'Use bullet points: “Built ___,” “Improved ___ by X%.”' },
              { section: 'Skills', points: 10, focus: '20+ skills, relevant to target role', tip: 'Add top 3 relevant skills; get endorsements.' },
              { section: 'Education', points: 8, focus: 'Degrees, coursework', tip: 'Include relevant degrees, certificates, and honors.' },
              { section: 'Licenses/Certs', points: 7, focus: 'At least 1 certification', tip: 'Add Google, AWS, Coursera, or similar certs.' },
              { section: 'Recommendations', points: 7, focus: '2+ received, 1 given', tip: 'Ask managers or peers for authentic feedback.' },
              { section: 'Custom URL', points: 3, focus: 'Clean vanity URL', tip: 'Use: linkedin.com/in/yourname.' },
              { section: 'Featured/Media', points: 5, focus: 'Resume, portfolio, or posts', tip: 'Add links or media that show your work.' },
              { section: 'Activity & Groups', points: 5, focus: 'Regular posts/comments', tip: 'Stay active weekly; join career groups.' },
              { section: 'Volunteer/Projects', points: 5, focus: 'Extra engagement', tip: 'Add projects or volunteering that show initiative.' },
              { section: 'Languages', points: 5, focus: 'Work-ready languages', tip: 'List all languages you can communicate in.' },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.section}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.focus}</td>
                <td className="px-6 py-4 text-gray-500">{item.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Quick Overall Tips</h4>
        <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
            <li>Use a professional photo and headline with keywords.</li>
            <li>Write a friendly, focused “About” section.</li>
            <li>Quantify achievements in experience.</li>
            <li>Keep your profile active and updated.</li>
            <li>Show credibility with certifications and recommendations.</li>
        </ul>
      </div>
    </div>

    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Priority Fixes (High Impact)</h3>
        <div className="space-y-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <h4 className="font-bold text-red-800">❌ About Section Too Short</h4>
                <p className="text-sm text-red-700">Recommended: 3-4 paragraphs. This section is crucial for telling your career story.</p>
                <button className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-200">Generate with AI ✨</button>
            </div>
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <h4 className="font-bold text-yellow-800">⚠️ Headline Missing Keywords</h4>
                <p className="text-sm text-yellow-700">Your headline should include keywords for your target role like 'Python', 'React', etc.</p>
                <button className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-200">Generate New Headlines ✨</button>
            </div>
        </div>
    </div>
  </div>
);
const SocialCleanUp = () => {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    facebook: '',
  });

  const [checklist, setChecklist] = useState({
    profilePhoto: false,
    usernameConsistent: false,
    bioReflects: false,
    noNegativePosts: false,
    tagsAppropriate: false,
    contactUpdated: false,
  });

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setChecklist(prev => ({ ...prev, [name]: checked }));
  };

  const socialPlatforms = [
    { name: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/yourname' },
    { name: 'github', label: 'GitHub', placeholder: 'github.com/yourusername' },
    { name: 'twitter', label: 'X / Twitter', placeholder: 'twitter.com/yourhandle' },
    { name: 'instagram', label: 'Instagram', placeholder: 'instagram.com/yourprofile' },
    { name: 'facebook', label: 'Facebook', placeholder: 'facebook.com/yourprofile' },
  ];

  const checklistItems = [
    { name: 'profilePhoto', label: 'Profile photo is professional and recent.' },
    { name: 'usernameConsistent', label: 'Username/handle is consistent across platforms.' },
    { name: 'bioReflects', label: 'Bio reflects current role or career interests.' },
    { name: 'noNegativePosts', label: 'No outdated or negative posts are publicly visible.' },
    { name: 'tagsAppropriate', label: 'Comments and tagged content are appropriate.' },
    { name: 'contactUpdated', label: 'Contact info and links are up-to-date.' },
  ];

  return (
    <div className="space-y-8">
      {/* Social Profile Input */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-gray-800">1. Add Your Social Profiles</h3>
          <span className="ml-3 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">Coming Soon</span>
        </div>
      </div>

      {/* Professionalism Checklist */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-gray-800">2. Professionalism Checklist</h3>
          <span className="ml-3 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">Coming Soon</span>
        </div>
      </div>

      {/* Tone & Content Review */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Tone & Content Review Guide</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 space-y-2">
          <p><strong className="font-semibold">Archive or Hide:</strong> Old posts that don't reflect your current professional self, controversial topics, or overly personal content.</p>
          <p><strong className="font-semibold">Update for Consistency:</strong> Ensure your job title, company, and bio match your resume. Inconsistent information can be a red flag for recruiters.</p>
          <p><strong className="font-semibold">Check Your Voice:</strong> Is your tone professional yet authentic? Aim for a voice that is positive, constructive, and aligned with your target industry.</p>
        </div>
      </div>

      {/* Download Report */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Download Your Social Audit Report</h3>
        <p className="text-sm text-gray-600 mb-4">Generate a summary of your clean-up progress and a personal action plan.</p>
        <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
          Download Action Plan (PDF)
        </button>
      </div>
    </div>
  );
};
const ContentGuide = () => {
  const postTemplates = [
    {
      title: 'Career Achievement / Milestone',
      structure: 'Start with the exciting news. Thank the people/organization involved. Share a brief reflection on the journey. End with what you\'re looking forward to.',
      hashtags: '#CareerGrowth #NewJob #Promotion #Achievement',
    },
    {
      title: 'Learning Reflection',
      structure: 'Share a concept you recently learned. Explain it simply. Mention how you plan to apply it. Ask if others have experience with it.',
      hashtags: '#AlwaysLearning #ProfessionalDevelopment #NewSkills',
    },
    {
      title: 'Project Showcase',
      structure: 'Describe the problem you solved. Explain your solution and the tech used. Share the outcome or what you learned. Include a link or visual.',
      hashtags: '#Project #Portfolio #WebDevelopment #CaseStudy',
    },
    {
      title: 'Industry Insight / Opinion',
      structure: 'State a clear opinion on a trend. Provide 1-2 points to support it. Acknowledge a counter-point briefly. End with a question for your network.',
      hashtags: '#FutureOfWork #TechTrends #IndustryInsights',
    },
  ];

  const postingSchedule = [
    { platform: 'LinkedIn', times: 'Tuesday–Thursday, 9 AM–12 PM', tip: 'Best for professional updates and long-form content.' },
    { platform: 'Twitter / X', times: 'Weekdays, 8 AM–10 AM or 5 PM–7 PM', tip: 'Ideal for quick insights, questions, and joining conversations.' },
    { platform: 'Instagram', times: 'Weekdays, 10 AM–2 PM', tip: 'Great for visual content like project mockups or event photos.' },
  ];

  return (
    <div className="space-y-8">
      {/* Content Planning Dashboard */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Content Planning Dashboard</h3>
        <p className="text-sm text-gray-600 mb-4">Organize your post ideas. Mark them as 'Draft' or 'Ready to Post'.</p>
        {/* This would be an interactive component for adding/managing ideas */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center text-gray-500">
          Your content ideas will appear here.
        </div>
      </div>

      {/* Post Templates Library */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Post Templates Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {postTemplates.map((template, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-900">{template.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.structure}</p>
              <p className="text-sm text-blue-600 mt-2 font-medium">{template.hashtags}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Voice & Posting Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Brand Voice Tips</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong className="font-semibold">Be Authentic:</strong> Write how you speak. Avoid corporate jargon.</li>
            <li><strong className="font-semibold">Share Experiences:</strong> Talk about the process and what you learned, not just the final result.</li>
            <li><strong className="font-semibold">Keep it Concise:</strong> Use short paragraphs and bullet points for readability.</li>
            <li><strong className="font-semibold">Stay Positive:</strong> Frame challenges as learning opportunities.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Posting Schedule Recommendations</h3>
          <div className="space-y-3">
            {postingSchedule.map((item, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-800">{item.platform}: <span className="font-normal text-blue-600">{item.times}</span></p>
                <p className="text-xs text-gray-500">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Posting Tips */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">5. Posting Tips</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 space-y-2">
          <p><strong className="font-semibold">For LinkedIn:</strong> Start with a relatable hook, use short paragraphs, add visuals, tag relevant people/companies, and end with a question to spark engagement.</p>
          <p><strong className="font-semibold">For GitHub/Portfolio:</strong> Keep project READMEs and descriptions up-to-date. Add visuals, demo links, and highlight the results or learning outcomes.</p>
          <p><strong className="font-semibold">For Twitter/X:</strong> Keep it concise and focused. Use 2-3 relevant hashtags. Reply and interact with others in your field to build your network.</p>
        </div>
      </div>

      {/* Downloadable Calendar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">6. Downloadable Posting Calendar</h3>
        <p className="text-sm text-gray-600 mb-4">Get a clean, printable monthly calendar to plan your content schedule.</p>
        <button disabled className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:bg-gray-400">
          Download Calendar (PDF)
        </button>
      </div>
    </div>
  );
};
const Tutorials = () => {
  const tutorialData = [
    { id: 1, title: 'Building a Secure PHP Login System', category: 'Web Development', duration: '10 min read', level: 'Intermediate', type: 'Article', preview: 'Learn to create a secure user login using PHP and MySQL with form validation.' },
    { id: 2, title: 'Optimizing Your LinkedIn Profile', category: 'Career Growth', duration: '15 min read', level: 'Beginner', type: 'Article', preview: 'A step-by-step guide to making your LinkedIn profile stand out to recruiters.' },
    { id: 3, title: 'Intro to Responsive Layouts with Tailwind CSS', category: 'Design & UI', duration: '8 min read', level: 'Beginner', type: 'Article', preview: 'Master responsive design principles using Tailwind CSS utility classes.' },
    { id: 4, title: 'Mastering Git: A Beginner\'s Guide', category: 'Productivity', duration: '20 min video', level: 'Beginner', type: 'Video', preview: 'Understand the basics of version control with Git, from commits to branches.' },
    { id: 5, title: 'React Hooks Explained (useState & useEffect)', category: 'Web Development', duration: '12 min video', level: 'Intermediate', type: 'Video', preview: 'A deep dive into the most common React Hooks for state and side effects.' },
    { id: 6, title: 'Ace Your Behavioral Interview', category: 'Career Growth', duration: '18 min read', level: 'Intermediate', type: 'Article', preview: 'Learn the STAR method and prepare for common behavioral questions.' },
    { id: 7, title: 'Figma for Beginners: Prototyping a Mobile App', category: 'Design & UI', duration: '25 min video', level: 'Beginner', type: 'Video', preview: 'Follow along to design and prototype a simple mobile application in Figma.' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [saved, setSaved] = useState([]);
  const [completed, setCompleted] = useState([]);

  const categories = ['All', ...new Set(tutorialData.map(t => t.category))];

  const filteredTutorials = tutorialData.filter(tutorial => {
    const categoryMatch = activeCategory === 'All' || tutorial.category === activeCategory;
    const searchMatch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || tutorial.preview.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleComplete = (id) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const categoryColors = {
    'Web Development': 'bg-blue-100 text-blue-800',
    'Career Growth': 'bg-green-100 text-green-800',
    'Design & UI': 'bg-purple-100 text-purple-800',
    'Productivity': 'bg-yellow-100 text-yellow-800',
  };

  const TutorialCard = ({ tutorial }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${completed.includes(tutorial.id) ? 'opacity-60' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[tutorial.category]}`}>{tutorial.category}</span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{tutorial.duration}</span>
            <span className="font-bold">·</span>
            <span>{tutorial.level}</span>
          </div>
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{tutorial.title}</h4>
        <p className="text-sm text-gray-600 mb-4">{tutorial.preview}</p>
        <div className="flex items-center justify-between">
          <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">Read More</button>
          <div className="flex items-center gap-4">
            <button onClick={() => toggleSave(tutorial.id)} title={saved.includes(tutorial.id) ? 'Unsave' : 'Save'}>
              <svg className={`w-5 h-5 ${saved.includes(tutorial.id) ? 'text-yellow-500 fill-current' : 'text-gray-400 hover:text-yellow-500'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </button>
            <button onClick={() => toggleComplete(tutorial.id)} className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${completed.includes(tutorial.id) ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {completed.includes(tutorial.id) ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
      {completed.includes(tutorial.id) && <div className="h-1 bg-green-500"></div>}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">Tutorial Library</h3>
        <p className="text-sm text-gray-600 mb-4">Explore resources to improve your technical and professional skills.</p>
        <input
          type="text"
          placeholder="Search tutorials by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* My Library (Saved Tutorials) */}
      {saved.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">My Saved Tutorials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorialData.filter(t => saved.includes(t.id)).map(tutorial => (
              <div key={tutorial.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">{tutorial.title}</span>
                <button onClick={() => toggleSave(tutorial.id)} className="text-gray-400 hover:text-red-500 text-xs font-bold">X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories and Grid */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutorials.length > 0 ? (
            filteredTutorials.map(tutorial => <TutorialCard key={tutorial.id} tutorial={tutorial} />)
          ) : (
            <div className="md:col-span-2 text-center py-12 text-gray-500">
              <h4 className="text-lg font-semibold">No tutorials found.</h4>
              <p>Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LinkedInOptimizerPage = () => {
  const [activeTab, setActiveTab] = useState('analyzer');

  const tabs = [
    { id: 'analyzer', label: 'LinkedIn Analyzer' },
    { id: 'social', label: 'Social Clean-Up' },
    { id: 'content', label: 'Content Guide' },
    { id: 'tutorials', label: 'Tutorials' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analyzer':
        return <LinkedInAnalyzer />;
      case 'social':
        return <SocialCleanUp />;
      case 'content':
        return <ContentGuide />;
      case 'tutorials':
        return <Tutorials />;
      default:
        return <LinkedInAnalyzer />;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">LinkedIn & Online Presence Optimizer</h1>
          <p className="text-lg text-gray-600">Build a powerful personal brand that gets you noticed.</p>
        </header>

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex flex-wrap -mb-px space-x-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default LinkedInOptimizerPage;