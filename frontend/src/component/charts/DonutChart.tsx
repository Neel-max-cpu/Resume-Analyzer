'use client';
import React from 'react'

import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface Props {
    percentage: number;
}

const DonutChart = ({ percentage }: Props) => {
    const data = {
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: [
                    "#009668",
                    "#d3e4fe",
                ],
                borderWidth: 0,
                borderRadius: 10,                
            },
        ],
    };

    const options = {
        cutout: "75%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
    };
    return (
        <div className="relative h-60 w-60">
            <Doughnut data={data} options={options} />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-[#009668]">
                    {percentage}%
                </h2>

                <p className="text-sm text-slate-700 font-medium">
                    High Fit
                </p>
            </div>
        </div>
    )
}

export default DonutChart