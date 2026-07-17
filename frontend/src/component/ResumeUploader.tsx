import React from 'react'

const ResumeUploader = () => {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold">
          Upload Resume
        </h2>
  
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-500">
            Drag & Drop your resume here
          </p>
  
          <p className="my-2 text-gray-400">or</p>
  
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Choose PDF
          </button>
        </div>
      </div>
    );
  };
  
  export default ResumeUploader;