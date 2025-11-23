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
    <div className="min-h-screen bg-white">

      {/* ============================= */}
      {/* HERO — Minimal & Premium */}
      {/* ============================= */}
      <header className="min-h-[80vh] flex items-center justify-center text-center relative bg-white">

        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,197,253,0.25),transparent)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Grow Your Career with Confidence
            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Tools for Modern Professionals
            </span>
          </h1>

          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Clean, simple, effective. Everything you need to explore your path,
            strengthen your brand, and show your best work — in one minimalist platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/create-resume"
              className="px-8 py-3 rounded-lg bg-gray-900 text-white text-lg font-medium hover:bg-black transition"
            >
              Get Started
            </Link>

            <a
              href="#tools"
              className="px-8 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 text-lg font-medium hover:bg-gray-100 transition"
            >
              Explore Tools
            </a>
          </div>

        </div>
      </header>




      {/* ============================= */}
      {/* TOOLS GRID — Modern Minimal Cards */}
      {/* ============================= */}
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




      {/* ============================= */}
      {/* PROCESS SECTION — Minimal Flow */}
      {/* ============================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A Clear Path, From Start to Success
          </h2>

          <p className="text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
            A minimal visual journey that helps you understand where you’re going.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">

            <HowStep number="1" title="Explore" description="See what fits you best" />

            <FlowArrow />

            <HowStep number="2" title="Optimize" description="Sharpen your online brand" />

            <FlowArrow />

            <HowStep number="3" title="Communicate" description="Write with clarity" />

            <FlowArrow />

            <HowStep number="4" title="Present" description="Show your best work" />

          </div>

        </div>
      </section>

    </div>
  );
};






/* ================================= */
/* COMPONENTS — Minimal & Clean */
/* ================================= */

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
      className="text-gray-900 font-medium hover:underline flex items-center gap-1"
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
