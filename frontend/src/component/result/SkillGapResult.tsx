import { matchingSkill, missingSkill, shortInfo } from '@/data/info'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import DonutChart from '../charts/DonutChart'
import { MdVerified } from 'react-icons/md'
import { CircleCheck, CircleX, Star } from 'lucide-react'
import { FaExclamation } from 'react-icons/fa'

const SkillGapResult = () => {
  return (
    <div className="flex flex-col min-h-screen main-background text-slate-700 container mx-auto px-2 sm:px-6 lg:px-2">
      {/* back button */}
      <div className="flex items-center justify-start gap-x-3 cursor-pointer">
        <IoMdArrowBack className="text-blue-500" />
        <span className="line1 text-blue-500 font-medium text-base">Back to Upload</span>
      </div>

      {/* short info */}
      <div className="grid gap-4 sm:grid-cols-2 max-w-7xl mx-auto mt-12 pb-10">
        {shortInfo.map(({ id, icon: Icon, title, fileName, desc }) => (
          <div key={id} className="rounded-xl bg-white border border-blue-200 p-5">
            <div className="flex items-center justify-between gap-x-3">
              <div className="flex items-center justify-center gap-x-2">
                <Icon className="w-4 h-4 text-slate-600" />
                <p className="mt-3 text-base font-semibold tracking-wide text-slate-700">{title}</p>
              </div>
              <div className="italic font-light text-sm">
                {fileName}
              </div>
            </div>
            <div className="p-2 italic bg-blue-100 rounded-lg mt-3">
              <p className="text-sm text-slate-500 font-medium">"{desc}"</p>
            </div>
          </div>
        ))}
      </div>


      {/* main section */}
      <div className="grid gap-4 sm:grid-cols-2 max-w-7xl mx-auto mt-12 pb-10">
        {/* graph */}
        <div className="flex flex-col p-5 w-150 items-center justify-center gap-y-10 bg-white rounded-lg border border-gray-300">
          <h1 className="text-xl text-slate-700">Overall Match</h1>
          <DonutChart percentage={85} />
          <div className="rounded-xl bg-[#e5f4f0] flex items-center justify-center p-3 text-[#009668] gap-x-2">
            <MdVerified className="" />
            <span className="">Qualified</span>
          </div>
          <div className="p-3">
            <p className="text-[#027c57] text-pretty text-center">
              The candidate excees technical requirements for distributed system but lacks specific Kubernetes orchestration certificates
            </p>
          </div>
        </div>

        {/* skills */}
        <div className="flex flex-col gap-y-10">
          {/* matched skills */}
          <div className="skill">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-x-3">
                <div className="rounded-xl bg-[#e5f4f0] p-2 text-[#009668]">
                  <CircleCheck className="text-[#027c57]" />
                </div>
                <h1 className="text-slate-700 text-xl font-semibold">Matched Skills</h1>
              </div>
              <span className="text-[#027c57] font-medium text-sm">12 Skills found</span>
            </div>
            {/* map */}
            <div className="flex flex-wrap gap-3 mt-4">
              {/* matching skills */}
              {matchingSkill.map(({ id, star, name }) => (
                <div key={id} className="flex items-center gap-x-1.5 px-4 py-2 bg-blue-100 border border-gray-300 rounded-lg"
                >
                  <p className="text-sm text-slate-600">{name}</p>
                  {star && <Star className="w-2 h-2 fill-emerald-600 text-emerald-600" />}
                </div>
              ))}
            </div>
          </div>


          {/* missing skills */}
          <div className="skill">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-x-3">
                <div className="rounded-xl bg-[#e5f4f0] p-2 text-[#009668]">
                  <CircleX className="text-red-600" />
                </div>
                <h1 className="text-slate-700 text-xl font-semibold">Missign Skills</h1>
              </div>
              <span className="text-red-500 font-medium text-sm">3 Gaps identified</span>
            </div>
            {/* map */}
            <div className="flex flex-wrap gap-3 mt-4">
              {/* missing skills */}
              {missingSkill.map(({ id, star, name }) => (
                <div key={id} className="flex items-center gap-x-1.5 px-4 py-2 bg-white border border-gray-300 rounded-lg"
                >
                  <p className="text-sm text-slate-600">{name}</p>
                  {star && <FaExclamation className="w-2.5 h-2.5 fill-red-600 text-red-600" />}
                </div>
              ))}
            </div>
            {/* suggestion */}            
            <div className="mt-4 pl-4 pr-4 py-3 bg-indigo-50 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">AI Suggestion:</span> Although "Kubernetes" is missing, the candidate's strong "Docker" and "AWS" background suggests a short learning curve.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default SkillGapResult