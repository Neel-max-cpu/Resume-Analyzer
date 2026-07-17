import React from 'react'

const JDInput = () => {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-2 text-lg font-semibold">
          Job Description
        </h2>
  
        <textarea
          placeholder="Paste the Job Description here..."
          className="h-60 w-full rounded-lg border p-4 outline-none focus:border-blue-500"
        />
      </div>
    );
  };
  
  export default JDInput;