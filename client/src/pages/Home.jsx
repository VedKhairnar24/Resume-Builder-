import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Linkedin,
  Mail,
  FileText,
  ArrowRight,
  Library,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
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

          <p
            className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Explore your career path, optimize your LinkedIn, write better emails, and create impressive resumes — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            {/* FIXED: use "to" instead of "href" */}
            <Link
              to="/create-resume"
              className="inline-flex items-center bg-blue-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

            {/* FIXED: correct closing tag for Link */}
            <Link
              to="#tools"
              className="inline-flex items-center bg-white text-gray-700 font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </header>

      {/* TOOLS GRID */}
      <section id="tools" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Everything You Need to Build Your Professional Identity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

            <ServiceCard
              icon={<Compass className="w-8 h-8 text-gray-900" />}
              title="Career Explorer"
              tagline="Clarity for your next step."
              features={["Guided planning", "Role insights", "Career roadmap"]}
              link="/career-explorer"
            />

            <ServiceCard
              icon={<Linkedin className="w-8 h-8 text-gray-900" />}
              title="LinkedIn Optimizer"
              tagline="Build a strong presence."
              features={["Profile scoring", "Brand polishing", "Content ideas"]}
              link="/linkedin-optimizer"
            />

            <ServiceCard
              icon={<Mail className="w-8 h-8 text-gray-900" />}
              title="Email Templates"
              tagline="Write clearly & professionally."
              features={["Job search emails", "Networking scripts", "Follow-ups"]}
              link="/email-templates"
            />

            <ServiceCard
              icon={<FileText className="w-8 h-8 text-gray-900" />}
              title="Create Resume"
              tagline="Minimal, clean, modern resumes."
              features={["Templates", "Instant preview", "Export options"]}
              link="/create-resume"
            />

            <ServiceCard
              icon={<Library className="w-8 h-8 text-gray-900" />}
              title="Resource Library"
              tagline="Curated tools & guides."
              features={["Career guides", "Growth resources", "Downloads"]}
              link="/resource-library"
            />
          </div>
        </div>
      </section>

      {/* PROCESS FLOW */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-gray-900 mb-4">Every Step Covered</h2>
          <p className="text-lg text-gray-600 mb-12">
            From discovering your path to presenting yourself professionally.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">

            <HowStep number="1" title="Explore" description="Discover career paths" />
            <FlowArrow />

            <HowStep number="2" title="Optimize" description="Build your online brand" />
            <FlowArrow />

            <HowStep number="3" title="Communicate" description="Write professional emails" />
            <FlowArrow />

            <HowStep number="4" title="Present" description="Create standout resumes" />
          </div>

        </div>
      </section>
    </div>
  );
};

/* ========== COMPONENTS ========== */

const ServiceCard = ({ icon, title, tagline, features, link }) => (
  <div className="p-7 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:-translate-y-[2px] transition-all duration-200">
    <div className="mb-5">{icon}</div>

    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-500 text-sm mb-4">{tagline}</p>

    <ul className="text-sm text-gray-600 space-y-1 mb-6">
      {features.map((feature, i) => (
        <li key={i}>• {feature}</li>
      ))}
    </ul>

    <Link
      to={link}
      className="mt-auto text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
    >
      Learn More <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

const HowStep = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-14 h-14 flex items-center justify-center mx-auto rounded-full border border-gray-300 font-semibold">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 mt-3">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const FlowArrow = () => (
  <ArrowRight className="w-8 h-8 text-gray-300 rotate-90 md:rotate-0" />
);

export default Home;
