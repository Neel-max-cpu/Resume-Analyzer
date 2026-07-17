import React from 'react'

const AssignmentToggle = () => {
    return (
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-semibold">
          Select Analysis
        </h2>
  
        <div className="flex gap-3">
          <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white">
            Skill Gap Checker
          </button>
  
          <button className="rounded-lg border px-5 py-2">
            Fit Verdict
          </button>
        </div>
      </div>
    );
  };

export default AssignmentToggle