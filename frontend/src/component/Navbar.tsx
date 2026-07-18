import React from 'react'

const Navbar = () => {
  return (
    <header className="border-b-2 border-slate-200 shadow-md nav-color mb-10">
      <div className="flex max-w-xl px-2 py-5 gap-x-10">
        <h1 className="text-xl font-bold tracking-tight primary-text">
          Resume AI Analyzer
        </h1>       
        {/* assignment 1 or assignment 2 - which one is selected that one underline*/}
        <div className="flex px-2 text-base items-center gap-x-4 text-center secondary-text font-semibold">
          <h1 className="text-blue-500 underline underline-offset-5">Assignment 1</h1>
          <h1>Assignment 2</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar