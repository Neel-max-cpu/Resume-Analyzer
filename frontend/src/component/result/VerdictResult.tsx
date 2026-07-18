import { fitPercent, insights } from '@/data/info'
import { Clock, FileChartColumnIncreasing, Search } from 'lucide-react'
import React from 'react'

const VerdictResult = () => {
  let profileContext = "The candidate shows a high ceiling for growth in DevOps, but current project requirements prioritize immediate infrastructure autonomy."

  return (
    <div className="flex flex-col min-h-screen main-background text-slate-700 container mx-auto px-2 sm:px-6 lg:px-2">

      {/* header */}
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-slate-900">Verdict Analysis</h1>
        <p className="font-light">Evaluation Report: Senior Frontend Developer Position</p>
      </div>

      {/* 2section column */}
      <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-6 mt-10">
        {/* column 1 */}
        <div className="flex flex-col w-full gap-y-5">

          {/* row 1 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg">
            {/* icon -- 3 icon cross, search and tick */}
            <Search className="w-8 h-8 text-[#e09135]" strokeWidth={4} />
            <h1 className="text-4xl font-bold text-slate-900">Almost There</h1>
            {/* success, maybe, failed */}
            <div className="px-4 py-3 flex items-center justify-center gap-x-2 bg-yellow-100 rounded-lg ">
              {/* icon tick,clock,cross */}
              <Clock className="text-[#9c511f] w-4 h-4" />
              <p className="text-sm text-[#9c511f]">SECONDARY CANDIDATE BATCH</p>
            </div>
            {/* reason */}
            <div className="w-[70%]">
              <p className="text-center text-gray-600">
                The candidate demonstrate significant technical proficiency but requirs specific architectural alignment for the current infrastructure.
              </p>
            </div>
          </div>

          {/* row 2 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg">
            <div className="w-full flex justify-start items-center gap-x-2">
              <FileChartColumnIncreasing className="text-blue-500 w-6 h-6" strokeWidth={3} />
              <p className="text-slate-700 font-semibold text-2xl">Key Insights</p>
            </div>
            {/* <div className="overflow-y-auto">
              {insights.map(({ id, icon: Icon, background, iconBg, iconColor, title, Desc }) => (
                <div key={id} className="gap-y-3">
                  <div className="grid grid-cols-[2fr_7fr]">                    
                    <div className=""></div>
                  </div>

                </div>
              ))}
            </div> */}
            <div className="flex flex-col gap-y-3 max-h-[340px] overflow-y-auto pr-1">
              {insights.map(({ id, icon: Icon, rowBg, iconBg, iconColor, title, desc }) => (
                <div key={id} className={`grid grid-cols-[auto_1fr] gap-x-3 items-start p-4 rounded-lg ${rowBg}`}>
                  {/* icon */}
                  <div className={`rounded-full p-2 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  {/* text */}
                  <div>
                    <p className="text-slate-800 font-medium">{title}</p>
                    <p className="text-sm text-slate-500 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>


        {/* column 2 */}
        <div className="flex flex-col w-full gap-y-3">
          {/* row 1 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg">
            <div className="p-3 flex flex-col w-full">
              <h1 className="text-gray-600 font-semibold">MATCH BREAKDOWN</h1>
              {/* % loading */}
              <div className="flex flex-col gap-y-5 mt-2 max-h-[220px] overflow-y-auto pr-1 bg-white">
                {fitPercent.map(({ id, color, title, percentage }) => (
                  <div key={id}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-700">{title}</p>
                      <span className={`font-semibold ${color.replace('bg-', 'text-')}`}>{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* row 2 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg bg-blue-100">
            <div className="w-full px-3 gap-y-2">
              <h1 className="font-semibold text-gray-600 text-lg">Profile Context</h1>
              <p className="italic text-sm font-light">"{profileContext}"</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default VerdictResult