import React, { useState } from 'react';
import axios from 'axios';

const DownloadButtons = ({ resumeId }) => {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState(null);

  const handleDownload = async (downloadFormat) => {
    setLoading(true);
    setFormat(downloadFormat);

    try {
      if (!resumeId) {
        throw new Error('Resume ID is missing');
      }

      console.log(`Starting ${downloadFormat.toUpperCase()} download for resume:`, resumeId);

      // Absolute backend URL
      const response = await axios.get(
        `http://localhost:5000/api/export/resume/${resumeId}/${downloadFormat}`,
        {
          responseType: 'blob',

          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept:
              downloadFormat === 'pdf'
                ? 'application/pdf'
                : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          },
        }
      );

      if (!response.data || response.data.size === 0) {
        throw new Error('Received empty file from server');
      }

      // Directly create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume_${Date.now()}.${downloadFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log(`${downloadFormat.toUpperCase()} downloaded successfully`);
    } catch (error) {
      console.error('Download error:', error);

      let errorMessage = 'Failed to generate file. Please try again.';

      if (error.response) {
        switch (error.response.status) {
          case 404:
            errorMessage = 'Resume not found. Please refresh the page.';
            break;
          case 403:
            errorMessage = 'You do not have permission to download this resume.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.response.data?.error || errorMessage;
        }
      } else if (error.message === 'Received empty file from server') {
        errorMessage = 'Generated file was empty. Please try again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      }

      if (window.toast) {
        window.toast.error(errorMessage);
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
      setFormat(null);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleDownload('pdf')}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading && format === 'pdf' ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-13" />
            </svg>
            <span>Download PDF</span>
          </>
        )}
      </button>

      <button
        onClick={() => handleDownload('docx')}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {loading && format === 'docx' ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download DOCX</span>
          </>
        )}
      </button>
    </div>
  );
};

export default DownloadButtons;
