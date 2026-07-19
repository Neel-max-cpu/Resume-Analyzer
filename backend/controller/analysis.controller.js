import { compareSkills } from "../services/compare.service.js";
import { extractSkills, generateVerdict } from "../services/gemini.service.js";
import extractPdfText from "../services/pdf.service.js";
import cleanJSON from "../utils/jsonCleaner.js";

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required."
            });
        }
        const { jobDescription, mode } = req.body;
        if (!jobDescription?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required."
            });
        }

        if (!["skill-gap", "verdict"].includes(mode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mode."
            });
        }

        const resumeText = await extractPdfText(req.file.buffer);

        const rawResponse = await extractSkills(
            resumeText,
            jobDescription
        );
        const skills = cleanJSON(rawResponse);
        const comparison = compareSkills(
            skills.resumeSkills,
            skills.jdSkills
        );



        // console.log(rawResponse);
        // console.log(skills);

        // Assignment 1
        if (mode === "skill-gap") {
            return res.json({
                success: true,
                mode,
                skills: skills,
                comparison: comparison,
            });
        }

        // Assignment 2
        if (mode === "verdict") {
            const rawVerdict = await generateVerdict(comparison);
            const verdict = cleanJSON(rawVerdict);
            return res.json({
                success: true,
                mode,
                skills: skills,
                verdict: verdict,
            });


        }

        return res.status(400).json({
            success: false,
            message: "Invalid mode."
        });



    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};