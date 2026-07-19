import { fitPercent, insights } from '@/data/info'
import { RootState } from '@/store/store'
import {
  Clock,
  FileChartColumnIncreasing,
  Search,
  CircleCheck,
  CircleX,
  CircleAlert
} from "lucide-react";
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const VerdictResult = () => {
  let profileContext = "The candidate shows a high ceiling for growth in DevOps, but current project requirements prioritize immediate infrastructure autonomy."

  const {
    result,
    resumeName,
    jobDescription
  } = useSelector(
    (state: RootState) => state.analysis
  );
  const router = useRouter();

  const data = result?.verdict;
  // console.log("data", data);

  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result]);

  const verdict = data?.verdict;
  const badge = data?.badge;

  const summary = data?.summary;
  const resProfileContex = data?.profileContext;

  const resBreakDown = data?.breakdown;
  const resInsights = data?.insights;
  const resRole = data?.currentJobRole;

  const verdictMap = {
    Qualified: {
      heading: "Qualified",
      icon: CircleCheck,
      iconColor: "text-green-600",
    },
    "Almost There": {
      heading: "Almost There",
      icon: Search,
      iconColor: "text-yellow-600",
    },
    "Not Yet": {
      heading: "Not Yet",
      icon: CircleX,
      iconColor: "text-red-600",
    },
  };

  const badgeMap = {
    "TOP CANDIDATE": {
      icon: CircleCheck,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    "SECONDARY CANDIDATE BATCH": {
      icon: Clock,
      bg: "bg-yellow-100",
      color: "text-yellow-700",
    },
    "NOT RECOMMENDED": {
      icon: CircleX,
      bg: "bg-red-100",
      color: "text-red-700",
    },
  };

  const insightStyles = {
    positive: {
      icon: CircleCheck,
      rowBg: "bg-blue-100",
      iconBg: "bg-green-200",
      iconColor: "text-green-600",
    },
    warning: {
      icon: CircleAlert,
      rowBg: "bg-orange-100",
      iconBg: "bg-orange-200",
      iconColor: "text-orange-600",
    },
    negative: {
      icon: CircleX,
      rowBg: "bg-red-100",
      iconBg: "bg-red-200",
      iconColor: "text-red-600",
    },
  };

  const colorMap = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    orange: "bg-orange-500",
    red: "bg-red-600",
  };

  // lookups — cast the any-typed API values to the map's known keys
  const verdictInfo = verdictMap[verdict as keyof typeof verdictMap] ?? verdictMap["Not Yet"];
  const badgeInfo = badgeMap[badge as keyof typeof badgeMap] ?? badgeMap["NOT RECOMMENDED"];

  const VerdictIcon = verdictInfo?.icon;
  const BadgeIcon = badgeInfo?.icon;



  return (
    <div className="flex flex-col min-h-screen main-background text-slate-700 container mx-auto px-2 sm:px-6 lg:px-2">

      {/* header */}
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-slate-900">Verdict Analysis</h1>
        <p className="font-light">Evaluation Report: {resRole}</p>
      </div>

      {/* 2section column */}
      <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-6 mt-10">
        {/* column 1 */}
        <div className="flex flex-col w-full gap-y-5">

          {/* row 1 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg">
            {/* icon1 -- 3 icon cross, search and tick */}
            {/* <Search className="w-8 h-8 text-[#e09135]" strokeWidth={4} /> */}
            {VerdictIcon && (
              <VerdictIcon
                className={`w-8 h-8 ${verdictInfo.iconColor}`}
                strokeWidth={3}
              />
            )}
            <h1 className="text-4xl font-bold text-slate-900">{verdict}</h1>
            {/* success, maybe, failed */}
            {/* <div className="px-4 py-3 flex items-center justify-center gap-x-2 bg-yellow-100 rounded-lg ">              
              <Clock className="text-[#9c511f] w-4 h-4" />
              <p className="text-sm text-[#9c511f]">{badge}</p>
            </div> */}
            <div
              className={`px-4 py-3 flex items-center gap-x-2 rounded-lg ${badgeInfo?.bg}`}
            >
              {BadgeIcon && (
                <BadgeIcon className={`w-4 h-4 ${badgeInfo?.color}`} />
              )}

              <p className={`text-sm font-medium ${badgeInfo?.color}`}>
                {badge}
              </p>
            </div>
            {/* reason */}
            <div className="w-[70%]">
              <p className="text-center text-gray-600">
                {summary}
              </p>
            </div>
          </div>

          {/* row 2 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg">
            <div className="w-full flex justify-start items-center gap-x-2">
              <FileChartColumnIncreasing className="text-blue-500 w-6 h-6" strokeWidth={3} />
              <p className="text-slate-700 font-semibold text-2xl">Key Insights</p>
            </div>
            <div className="flex flex-col gap-y-3 max-h-[340px] overflow-y-auto pr-1">
              {/* {insights.map(({ id, icon: Icon, rowBg, iconBg, iconColor, title, desc }) => (
                <div key={id} className={`grid grid-cols-[auto_1fr] gap-x-3 items-start p-4 rounded-lg ${rowBg}`}>                  
                  <div className={`rounded-full p-2 ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>                  
                  <div>
                    <p className="text-slate-800 font-medium">{title}</p>
                    <p className="text-sm text-slate-500 mt-1">{desc}</p>
                  </div>
                </div>
              ))} */}
              {resInsights?.map((item: any, index: number) => {
                const style = insightStyles[item.type as keyof typeof insightStyles];
                const Icon = style.icon;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-[auto_1fr] gap-x-3 items-start p-4 rounded-lg ${style.rowBg}`}
                  >
                    <div className={`rounded-full p-2 ${style.iconBg}`}>
                      <Icon className={`w-5 h-5 ${style.iconColor}`} />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                {/* {fitPercent.map(({ id, color, title, percentage }) => (
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
                ))} */}
                {resBreakDown?.map((item: any, index: number) => {
                  const barColor = colorMap[item.color as keyof typeof colorMap];
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-700">
                          {item.title}
                        </p>

                        <span className={`font-semibold ${barColor.replace("bg-", "text-")}`}>{item.percentage}%</span>
                      </div>

                      <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor}`}
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          {/* row 2 */}
          <div className="p-5 flex flex-col items-center justify-center gap-y-4 border border-gray-300 rounded-lg bg-blue-100">
            <div className="w-full px-3 gap-y-2">
              <h1 className="font-semibold text-gray-600 text-lg">Profile Context</h1>
              <p className="italic text-sm font-light">"{resProfileContex}"</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default VerdictResult