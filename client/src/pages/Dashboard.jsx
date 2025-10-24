import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for resumes (would normally come from API)
  const resumes = [
    { id: 1, title: 'Software Developer Resume', createdAt: '2023-05-15' },
    { id: 2, title: 'Product Manager Resume', createdAt: '2023-06-20' },
    { id: 3, title: 'UX Designer Resume', createdAt: '2023-07-10' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <Link 
          to="/create-resume" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">You haven't created any resumes yet.</p>
          <Link 
            to="/create-resume" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => (
            <div key={resume.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{resume.title}</h2>
              <p className="text-gray-600 mb-4">Created: {resume.createdAt}</p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Edit
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;