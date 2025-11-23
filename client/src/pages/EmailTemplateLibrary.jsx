import React, { useState } from "react";
import { Mail, BookMarked, Clipboard, MessageSquare, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import api from "../services/api";

const templatesData = [
  {
    id: "job-app-follow-up",
    title: "Follow-Up After Job Application",
    scenario: "Job Search",
    tone: "Formal",
    preview:
      "I wanted to follow up regarding my application for the Software Engineer Intern role...",
    subject: "Follow-Up on Software Engineer Intern Application",
    fullText: `Dear [Hiring Manager’s Name],\n\nI hope you’re doing well...`,
  },
  {
    id: "interview-thank-you",
    title: "Thank-You After Interview",
    scenario: "Follow-Up & Thank You",
    tone: "Professional Casual",
    preview: "Thank you again for taking the time to speak with me today about the...",
    subject: "Thank You - [Job Title] Interview",
    fullText: `Hi [Interviewer's Name],\n\nThank you again...`,
  },
  {
    id: "networking-outreach",
    title: "Networking Outreach to Alumni",
    scenario: "Networking & Outreach",
    tone: "Professional Casual",
    preview: "My name is [Your Name], and I am a current student at...",
    subject: "Question from a fellow [Your University] student",
    fullText: `Hi [Alumni's Name],\n\nMy name is [Your Name]...`,
  },
  {
    id: "recommendation-request",
    title: "Request for Letter of Recommendation",
    scenario: "Academic Requests",
    tone: "Formal",
    preview: "I am writing to request a letter of recommendation for my application...",
    subject: "Recommendation Request for [Your Name]",
    fullText: `Dear Professor [Professor's Last Name],\n\nI hope this email finds you well...`,
  },
  {
    id: "project-update",
    title: "Project Progress Update",
    scenario: "Team & Project Communication",
    tone: "Friendly",
    preview: "Just a quick update on the project...",
    subject: "Update on [Project Name]",
    fullText: `Hi Team,\n\nJust a quick update...`,
  },
];

const communicationTips = [
  "Keep subject lines short and specific.",
  "Use clear, respectful greetings.",
  "Always include a closing and your name.",
  "Avoid slang, emojis, or unnecessary attachments.",
  "Always proofread for grammar and tone before sending.",
  "Reply within 24–48 hours whenever possible.",
];

const EmailTemplateLibrary = () => {
  const { isAuthenticated } = useAuth();

  const [activeScenario, setActiveScenario] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(templatesData[0]);
  const [saved, setSaved] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const scenarios = ["All", ...new Set(templatesData.map((t) => t.scenario))];

  const filteredTemplates = templatesData.filter(
    (template) => activeScenario === "All" || template.scenario === activeScenario
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTemplate.fullText);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  // -----------------------------------------
  //  Axios API Request
  // -----------------------------------------
  const generateEmail = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/email/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.email) {
        setSelectedTemplate((prev) => ({
          ...prev,
          fullText: res.data.email,
          subject: res.data.subject || "Generated Email",
        }));
      }
    } catch (error) {
      console.error("Gemini Email Generator Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to generate the email. Try again later."
      );
    }

    setLoading(false);
  };

  const toggleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Email & Communication Library
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Write clear, confident, and professional emails with our AI tools and templates.
          </p>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 space-y-6">

            {/* SCENARIOS */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Scenarios
              </h3>

              <div className="flex flex-wrap gap-2">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => setActiveScenario(scenario)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${activeScenario === scenario
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {scenario}
                  </button>
                ))}
              </div>
            </div>

            {/* TEMPLATE LIST */}
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${selectedTemplate.id === template.id
                    ? "bg-blue-100 border-2 border-blue-500 shadow-lg"
                    : "bg-white hover:bg-gray-50 border-2 border-transparent"
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800">{template.title}</h4>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(template.id);
                      }}
                    >
                      <Star
                        className={`w-5 h-5 ${saved.includes(template.id)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400 hover:text-yellow-400"
                          }`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {template.preview}
                  </p>

                  <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full mt-2 inline-block">
                    {template.tone}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* GENERATOR */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Generate Email From Context
              </h3>

              {!isAuthenticated ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  Please{" "}
                  <Link
                    to="/login"
                    className="text-red-600 underline font-semibold"
                  >
                    log in
                  </Link>{" "}
                  to use AI email generator.
                </div>
              ) : (
                <>
                  <textarea
                    placeholder="Write the context here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-28 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-0 resize-none"
                  />

                  <button
                    onClick={generateEmail}
                    disabled={loading}
                    className="mt-3 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition"
                  >
                    {loading ? "Generating..." : "Generate Email"}
                  </button>
                </>
              )}
            </div>

            {/* EDITOR */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-500" />
                  {selectedTemplate.title}
                </h2>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Clipboard className="w-4 h-4" />
                  {copySuccess || "Copy"}
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-800">
                  Subject: {selectedTemplate.subject}
                </p>

                <hr className="my-3" />

                <textarea
                  value={selectedTemplate.fullText}
                  onChange={(e) =>
                    setSelectedTemplate((prev) => ({
                      ...prev,
                      fullText: e.target.value,
                    }))
                  }
                  className="w-full h-80 bg-transparent border-none focus:ring-0 resize-none text-sm text-gray-700 leading-relaxed"
                />
              </div>
            </div>

            {/* SAVED */}
            {saved.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-yellow-500" /> Saved Templates
                </h3>

                <div className="flex flex-wrap gap-3">
                  {templatesData
                    .filter((t) => saved.includes(t.id))
                    .map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className="bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-yellow-100"
                      >
                        <p className="text-sm font-medium text-yellow-900">
                          {template.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TIPS */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Tips for Effective Communication
              </h3>

              <ul className="list-disc list-inside text-sm text-blue-800 space-y-2">
                {communicationTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateLibrary;
