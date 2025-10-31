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
const SocialCleanUp = () => <div className="bg-white p-6 rounded-xl shadow-md">Social Clean-Up Guide (Coming Soon)</div>;
const ContentGuide = () => <div className="bg-white p-6 rounded-xl shadow-md">Content Strategy & Posting Guide (Coming Soon)</div>;
const Tutorials = () => <div className="bg-white p-6 rounded-xl shadow-md">Tutorial Library (Coming Soon)</div>;

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
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