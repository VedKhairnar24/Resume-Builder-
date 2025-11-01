import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Linkedin, Mail, FileText, ArrowRight, Library } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <header className="py-24 md:py-32 text-center bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50 rounded-full filter blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
            data-aos="fade-up"
          >
            Grow Your Career, Build Your Brand,
            <span className="block mt-2 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              and Stand Out Professionally.
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Explore your career path, optimize your LinkedIn, write better emails, and create impressive resumes — all in one place.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <Link
              href="/create-resume"
              className="inline-flex items-center bg-blue-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="#tools"
              className="inline-flex items-center bg-white text-gray-700 font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              Explore Tools
            </Link>
          </div>

        </div>
      </header>
     
      {/* 2. Services Overview Section */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Career Explorer Card */}
            <ServiceCard
              icon={<Compass className="w-10 h-10 text-blue-500" />}
              title="Career Explorer"
              tagline="Discover your best-fit career direction."
              features={['Find step-by-step guidance', 'Learn employer expectations', 'Get practical career tips']}
              link="/career-explorer"
            />
            {/* LinkedIn Optimizer Card */}
            <ServiceCard
              icon={<Linkedin className="w-10 h-10 text-blue-500" />}
              title="LinkedIn Optimizer"
              tagline="Build a professional presence that gets noticed."
              features={['Evaluate and score your profile', 'Polish your digital footprint', 'Learn what to post']}
              link="/linkedin-optimizer"
            />
            {/* Email Templates Card */}
            <ServiceCard
              icon={<Mail className="w-10 h-10 text-blue-500" />}
              title="Email Templates"
              tagline="Write with confidence in any situation."
              features={['Templates for job searching', 'Networking & outreach samples', 'Polite follow-up messages']}
              link="/email-templates"
            />
            {/* Create Resume Card */}
            <ServiceCard
              icon={<FileText className="w-10 h-10 text-blue-500" />}
              title="Create Resume"
              tagline="Design your resume the smart way."
              features={['Choose professional templates', 'Update and preview instantly', 'Export in PDF or DOCX']}
              link="/create-resume"
            />
            {/* Resource Library Card */}
            <ServiceCard
              icon={<Library className="w-10 h-10 text-blue-500" />}
              title="Resource Library"
              tagline="Guides and tools for your career journey."
              features={['Beginner-friendly guides', 'Curated growth tools', 'Downloadable templates']}
              link="/resource-library"
            />
          </div>
        </div>
      </section>

      {/* 3. "How It Helps You" Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Every Step Covered</h2>
          <p className="text-lg text-gray-600 mb-12">From discovering your path to presenting yourself professionally.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <HowItHelpsStep number="1" title="Explore" description="Discover career paths" />
            <HowItHelpsArrow />
            <HowItHelpsStep number="2" title="Optimize" description="Build your online brand" />
            <HowItHelpsArrow />
            <HowItHelpsStep number="3" title="Communicate" description="Write professional emails" />
            <HowItHelpsArrow />
            <HowItHelpsStep number="4" title="Present" description="Create standout resumes" />
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, tagline, features, link }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col" data-aos="fade-up">
    <div className="mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{tagline}</p>
    <ul className="space-y-2 text-sm text-gray-500 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="text-blue-500">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <Link to={link} className="mt-auto text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
      Learn More <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

const HowItHelpsStep = ({ number, title, description }) => (
  <div className="text-center">
    <div className="mx-auto w-16 h-16 mb-3 flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-2xl rounded-full">
      {number}
    </div>
    <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
    <p className="text-gray-500">{description}</p>
  </div>
);

const HowItHelpsArrow = () => (
  <div className="text-gray-300 px-4 transform md:rotate-0 rotate-90">
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </div>
);

export default Home;
