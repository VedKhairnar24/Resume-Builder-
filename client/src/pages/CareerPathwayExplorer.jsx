import React, { useState } from "react";
import { Lightbulb, Code, Briefcase, Rocket, BookOpen } from "lucide-react";

const pathwayData = {
  "Software Engineering": {
    entry: ["Choose a Programming Language", "Learn DSA"],
    nodes: {
      "Choose a Programming Language": {
        next: ["Learn DSA"],
        tips: [
          "Start with C++, Java, or Python.",
          "Focus on syntax, logic, and problem-solving.",
          "Use platforms like W3Schools, GeeksforGeeks, or freeCodeCamp."
        ],
      },
      "Learn DSA": {
        next: ["Build Projects"],
        tips: [
          "Master arrays, strings, linked lists, stacks, and trees.",
          "Solve problems on LeetCode, CodeStudio, or GeeksforGeeks.",
          "Take part in contests on Codeforces and HackerRank."
        ],
      },
      "Build Projects": {
        next: ["Internship Preparation"],
        tips: [
          "Create at least 2–3 good projects.",
          "Use GitHub to host your code.",
          "Try web or mobile apps to showcase your skills."
        ],
      },
      "Internship Preparation": {
        next: ["Apply for Internships"],
        tips: [
          "Prepare a clean resume (1 page).",
          "Practice common interview questions.",
          "Use sites like Internshala, LinkedIn, and AngelList."
        ],
      },
      "Apply for Internships": {
        next: ["Full-Time Job Preparation"],
        tips: [
          "Reach out to recruiters on LinkedIn.",
          "Be consistent with applications.",
          "Learn how to explain your projects well."
        ],
      },
      "Full-Time Job Preparation": {
        next: ["Get Hired!"],
        tips: [
          "Revise core CS subjects: OS, DBMS, OOP, CN.",
          "Mock interviews with friends or Pramp.",
          "Be confident, polite, and consistent!"
        ],
      },
      "Get Hired!": {
        tips: [
          "Stay curious and keep learning.",
          "Focus on problem-solving, teamwork, and adaptability.",
          "Once you start, help juniors by sharing your journey!"
        ],
      },
    },
  },
};

const RoleNode = ({ role, type, onClick }) => (
  <div
    onClick={() => onClick(role)}
    className={`p-4 rounded-xl shadow-md text-center border cursor-pointer transition hover:shadow-lg ${
      type === "entry"
        ? "border-blue-500 bg-blue-50 hover:bg-blue-100"
        : "border-gray-200 bg-white hover:bg-gray-50"
    }`}
  >
    <h4 className="font-semibold text-gray-800">{role}</h4>
    {type === "entry" && (
      <span className="text-xs text-blue-600 font-medium block mt-1">
        Start Here
      </span>
    )}
  </div>
);

const CareerPathwayExplorer = () => {
  const [selectedField, setSelectedField] = useState("Software Engineering");
  const [selectedRole, setSelectedRole] = useState(null);

  const pathway = pathwayData[selectedField];
  const selectedRoleData = selectedRole
    ? pathway.nodes[selectedRole]
    : null;

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Career Pathway Explorer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your journey from college student to job-ready professional. Follow each step, practice well, and grow with confidence.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <label
              htmlFor="field-select"
              className="text-sm font-medium text-gray-700 mr-2"
            >
              Choose Field:
            </label>
            <select
              id="field-select"
              value={selectedField}
              onChange={handleFieldChange}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm px-2 py-1"
            >
              {Object.keys(pathwayData).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagram */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedField} Pathway
            </h2>
            <div className="space-y-6">
              {/* Entry Roles */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Steps
                </h3>
                <div className="flex flex-wrap gap-4">
                  {pathway.entry.map((role) => (
                    <RoleNode
                      key={role}
                      role={role}
                      type="entry"
                      onClick={setSelectedRole}
                    />
                  ))}
                  {Object.keys(pathway.nodes)
                    .filter((r) => !pathway.entry.includes(r))
                    .map((role) => (
                      <RoleNode
                        key={role}
                        role={role}
                        type="next"
                        onClick={setSelectedRole}
                      />
                    ))}
                </div>
              </div>

              {/* Tips Section */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Company Expectations
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Strong problem-solving skills and logical thinking.</li>
                  <li>Clean, maintainable code and understanding of Git.</li>
                  <li>Good communication and teamwork.</li>
                  <li>Project experience with real-world applications.</li>
                  <li>Curiosity to learn new technologies.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Role Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> Step Details
            </h2>
            {selectedRole ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg font-sans ">
                  {selectedRole}
                </h3>
                <h4 className="font-semibold mt-3 text-gray-700">Tips:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedRoleData?.tips?.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
                {selectedRoleData?.next && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Next Step:</span>{" "}
                    {selectedRoleData.next.join(", ")}
                  </p>
                )}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition">
                  Add to My Learning Plan
                </button>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">
                Click a step to view detailed guidance.
              </div>
            )}
          </div>
        </div>

        {/* Tips & Motivation */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Career Tips
          </h2>
          <p className="text-gray-700 mb-3">
            • Keep learning one new concept every week.
          </p>
          <p className="text-gray-700 mb-3">
            • Participate in hackathons, coding challenges, and open-source.
          </p>
          <p className="text-gray-700">
            • Build a portfolio site to showcase your projects and resume.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerPathwayExplorer;
