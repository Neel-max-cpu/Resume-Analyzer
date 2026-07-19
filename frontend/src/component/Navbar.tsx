'use client';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {
  const mode = useSelector(
    (state: RootState) => state.analysis.mode
  );
  
  const router = useRouter();
  const toHome = ()=>{
    router.push(`/`);
  }

  return (
    <header className="border-b-2 border-slate-200 shadow-md nav-color mb-10">
      <div className="flex max-w-xl px-2 py-5 gap-x-10">
        <h1
          onClick={toHome} 
          className="text-xl font-bold tracking-tight primary-text hover:cursor-pointer">
          Resume AI Analyzer
        </h1>
        {/* assignment 1 or assignment 2 - which one is selected that one underline*/}
        <div className="flex px-2 text-base items-center gap-x-4 text-center secondary-text font-semibold">
          <h1
            className={
              mode === "skill-gap"
                ? "text-blue-500 underline underline-offset-5"
                : ""
            }
          >
            Assignment 1
          </h1>
          <h1
            className={
              mode === "verdict"
                ? "text-blue-500 underline underline-offset-4"
                : ""
            }
          >Assignment 2</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar