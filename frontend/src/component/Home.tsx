import React from 'react'
import Navbar from './Navbar'
import AssignmentToggle from './AssignmentToggle';
import ResumeUploader from './ResumeUploader';
import JDInput from './JDInput';
import AnalyzeButton from './AnalyzeButton';
import { Textarea } from '@/components/ui/textarea';
import { BriefcaseBusiness, FileText, Icon, LayoutDashboard } from 'lucide-react';
import { exportInfo } from '@/data/info';
import { TbBriefcase2 } from 'react-icons/tb';
import { IoCloudUploadOutline } from 'react-icons/io5';

const Home = () => {
    let placeholderMsg = "Past the target job description here.. Our AI will identify core competencies, cultural fit markers, and critical technical requirements."


    return (
        <main className="min-h-screen main-background">
            {/* <Navbar /> */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl justify-center text-center primary-text font-semibold">Talent Evaluation</h1>
                    {/* buttons */}
                    <div className="flex items-center justify-center w-1/2 bg-blue-100 px-4 py-3 text-gray-700 font-semibold mt-4 rounded-lg border-none gap-x-4">
                        {/* button 1 - assignment1 */}
                        <button className="bg-white px-4 py-2 rounded-lg text-blue-500">Assignment 1: Skill Match</button>
                        {/* button 2 - assignment2 */}
                        <button className="">Assignment 2: Candidate Verdict</button>
                    </div>
                </div>

                {/* input fields upload and jd */}
                <div className="mt-16 flex flex-col gap-6 lg:flex-row">
                    {/* <div className="flex flex-row w-full items-center gap-x-5 mt-20"> */}
                    {/* drag and drop file */}
                    <div className="flex flex-col p-2 w-full lg:basis-[40%]">
                        <div className="flex gap-x-2 text-slate-700 font-semibold mb-3">
                            {/* icon */}
                            <FileText />
                            <h1 className="">RESUME UPLOAD</h1>
                        </div>
                        <div className="p-2 h-100 border-3 border-dashed border-gray-300 bg-white flex items-center justify-center rounded-lg hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out">
                            <div className="flex flex-col gap-y-3 text-slate-700 items-center justify-center">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <IoCloudUploadOutline className="w-8 h-8 text-blue-500 font-semibold" strokeWidth={4} />
                                </div>
                                <div className="flex flex-col py-2 items-center justify-center">
                                    <h1 className="font-semibold text-xl">Drag and drop your Resume</h1>
                                    <h1 className="text-slate-500">PDF (MAX 10MB)</h1>
                                </div>
                                <button className="px-3 py-2 border-2 border-blue-500 rounded-lg font-semibold text-blue-500">Browse File</button>
                            </div>
                        </div>
                    </div>
                    {/* jd text area */}
                    <div className="flex flex-col p-2 w-full lg:basis-[60%]">
                        <div className="flex gap-x-2 text-slate-700 font-semibold mb-3">
                            {/* icon */}
                            <TbBriefcase2 className="w-6 h-6"/>
                            <h1 className="">JOB DESCRIPTION</h1>
                        </div>
                        <div className="w-full h-100 bg-white border-2 border-gray-300 rounded-lg text-slate-700">
                            <Textarea placeholder={placeholderMsg} className="text-area" />
                        </div>
                    </div>
                </div>              

                {/* button */}
                <div className="mt-10 flex flex-col items-center justify-center gap-2 p-2">
                    <button className="hover:cursor-pointer hover:-translate-y-2 hover:transition transition-all duration-300 ease-in-out flex items-center gap-x-3 bg-[#0058be] hover:bg-[#00499f] py-4 px-10 rounded-xl shadow-lg transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-white" strokeWidth={2}/>
                        <span className="font-semibold text-2xl text-white">Analyze Resume</span>
                    </button>
                    <p className="text-sm text-slate-600">
                        Processing time: approximately <span className="text-blue-600 font-semibold">1.2 seconds</span>
                    </p>
                </div>


                {/* extra info */}
                <div className="grid gap-4 sm:grid-cols-3 max-w-7xl mx-auto mt-12 pb-10">
                    {exportInfo.map(({id, icon:Icon, title, desc})=>(
                        <div key={id} className="rounded-xl bg-blue-100 border border-blue-200 p-5">
                            <Icon className="w-5 h-5 text-blue-600"/>
                            <p className="mt-3 text-sm font-bold tracking-wide text-slate-700 uppercase">{title}</p>
                            <p className="mt-3 text-sm text-slate-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
};

export default Home;