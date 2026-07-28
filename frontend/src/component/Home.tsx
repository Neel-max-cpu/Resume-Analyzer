'use client';
import React, { useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import { BriefcaseBusiness, CheckCircle2, FileText, Icon, LayoutDashboard, LucideMousePointerClick } from 'lucide-react';
import { exportInfo } from '@/data/info';
import { TbBriefcase2 } from 'react-icons/tb';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { anlysePdf } from '@/utils/apiPath';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearResult, setJobDescription, setLoading, setMode, setResult, setResumeName } from '@/store/analysisSlice';

const Home = () => {
    let placeholderMsg = "Paste the target job description here.. Our AI will identify core competencies, cultural fit markers, and critical technical requirements."

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const {
        jobDescription,
        loading,
        mode
    } = useSelector(
        (state: RootState) => state.analysis
    );

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // upload file --
    const handleUpload = async () => {
        if (loading || !file) return;

        // check for jd/file        
        if (!file) {
            toast.error("Please upload a resume.");
            return;
        }

        if (!jobDescription.trim()) {
            toast.error("Please enter a job description.");
            return;
        }

        dispatch(setLoading(true));
        dispatch(clearResult());
        await toast.promise(
            anlysePdf(file, jobDescription, mode),
            {
                loading: "Analyzing...",
                success: "Completed!",
                error: (err) => err?.message || "Upload failed. Please try again.",
            }
        )
            .then((res: any) => {
                // console.log("res", res);
                dispatch(setJobDescription(""));
                dispatch(setResult(res));
                dispatch(setResumeName(file?.name));
                setTimeout(() => {
                    // with query params --
                    router.push(`/result?mode=${mode}`);
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }

    // drag and drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (loading) return;
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type !== "application/pdf") {
            toast.error("Only PDF allowed");
            return;
        }
        if (droppedFile.size > 10 * 1024 * 1024) {
            toast.error("Maximum file size is 10MB.");
            setFile(null);
            return;
        }

        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (loading) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (loading) return;

        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            toast.error("Only PDF files are allowed.");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            toast.error("Maximum file size is 10MB.");
            return;
        }

        setFile(selectedFile);
    };



    return (
        <main className="min-h-screen main-background">
            {/* <Navbar /> */}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* header */}
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-6xl justify-center text-center primary-text font-semibold">Talent Evaluation</h1>
                    {/* toggle buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full sm:w-2/3 lg:w-1/2 mx-auto bg-blue-100 px-2 py-2 sm:py-3 text-gray-700 font-semibold mt-4 rounded-lg gap-2 sm:gap-x-4">
                        {/* button 1 - assignment1 */}
                        <button
                            disabled={loading}
                            onClick={() => dispatch(setMode("skill-gap"))}
                            className={`px-4 py-2 rounded-lg transition hover:cursor-pointer hover:bg-white
                            disabled:hover:bg-transparent
                            disabled:cursor-not-allowed
                                ${mode === "skill-gap" ?
                                    "bg-white text-blue-500" : ""}
                            `}
                        >
                            Skill Match
                        </button>
                        {/* button 2 - assignment2 */}
                        <button
                            disabled={loading}
                            onClick={() => dispatch(setMode("verdict"))}
                            className={`px-4 py-2 rounded-lg transition hover:cursor-pointer hover:bg-white
                            disabled:hover:bg-transparent
                            disabled:cursor-not-allowed
                                ${mode === "verdict" ?
                                    "bg-white text-blue-500" : ""}
                            `}
                        >
                            Candidate Verdict
                        </button>
                    </div>
                </div>

                {/* input fields upload and jd */}
                <div className="mt-16 flex flex-col gap-6 lg:flex-row">
                    {/* <div className="flex flex-row w-full items-center gap-x-5 mt-20"> */}
                    {/* drag and drop file */}
                    <div
                        className="flex flex-col p-2 w-full lg:basis-[40%]"
                    >
                        <div className="flex gap-x-2 text-slate-700 font-semibold mb-3">
                            {/* icon */}
                            <FileText />
                            <h1 className="">RESUME UPLOAD</h1>
                        </div>
                        <div
                            onClick={() => !loading && inputRef.current?.click()}
                            onDrop={!loading ? handleDrop : undefined}
                            onDragOver={!loading ? handleDragOver : undefined}
                            onDragLeave={!loading ? handleDragLeave : undefined}
                            className={`p-2 h-100 border-3 border-dashed border-gray-300 bg-white flex items-center justify-center rounded-lg hover:cursor-pointer hover:border-blue-500 transition-all duration-200 ease-in-out
                            ${loading ? "pointer-events-none opacity-60 border border-gray-300" : ""}
                            ${isDragging
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 bg-white"
                                }
                            `}
                        >
                            <div className="flex flex-col gap-y-3 text-slate-700 items-center justify-center">
                                <div
                                    className={`p-3 rounded-lg ${file ? "bg-green-100" : "bg-blue-100"
                                        }`}
                                >
                                    {file ? (
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                    ) : isDragging ? (
                                        <LucideMousePointerClick className="w-8 h-8 text-blue-600" />
                                    ) : (
                                        <IoCloudUploadOutline
                                            className="w-8 h-8 text-blue-500"
                                            strokeWidth={3}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col py-2 items-center justify-center">
                                    {file ? (
                                        <>
                                            <h1 className="font-semibold text-xl text-green-600">
                                                {file?.name}
                                            </h1>
                                            <p className="text-sm text-slate-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <p className="text-blue-500">
                                                Click to replace
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className="font-semibold text-xl">
                                                Drag and drop your Resume
                                            </h1>
                                            <p className="text-slate-500">
                                                PDF (MAX 10MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        inputRef.current?.click();
                                    }}
                                    className="px-3 py-2 border-2 border-blue-500 rounded-lg font-semibold text-blue-500"
                                >
                                    Browse File
                                </button>
                            </div>
                            {/* input - hidden */}
                            <input
                                ref={inputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    {/* jd text area */}
                    <div className="flex flex-col p-2 w-full lg:basis-[60%]">
                        <div className="flex gap-x-2 text-slate-700 font-semibold mb-3">
                            {/* icon */}
                            <TbBriefcase2 className="w-6 h-6" />
                            <h1 className="">JOB DESCRIPTION</h1>
                        </div>
                        <div className="w-full h-100 bg-white border-2 border-gray-300 rounded-lg text-slate-700">
                            <Textarea
                                disabled={loading}
                                placeholder={placeholderMsg} className="text-area"
                                value={jobDescription}
                                onChange={(e) => dispatch(setJobDescription(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* button */}
                <div className="mt-10 flex flex-col items-center justify-center gap-2 p-2">
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className={`flex items-center gap-x-3 py-4 px-10 rounded-xl shadow-lg transition-all duration-300 ease-in-out
                            ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#0058be] hover:bg-[#00499f] hover:-translate-y-1 hover:cursor-pointer"
                            }`}
                    >
                        <LayoutDashboard className="w-4 h-4 text-white" strokeWidth={2} />
                        <span
                            className="font-semibold text-2xl text-white"
                        >
                            {loading ? "Analyzing..." : "Analyze Resume"}
                        </span>
                    </button>
                    <p className="text-sm text-slate-600">
                        Processing time: approximately <span className="text-blue-600 font-semibold">5-10 seconds</span>
                    </p>
                </div>


                {/* extra info */}
                <div className="grid gap-4 sm:grid-cols-3 max-w-7xl mx-auto mt-12 pb-10">
                    {exportInfo.map(({ id, icon: Icon, title, desc }) => (
                        <div key={id} className="rounded-xl bg-blue-100 border border-blue-200 p-5">
                            <Icon className="w-5 h-5 text-blue-600" />
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