import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const geminiModels = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite", // fallback
    "gemini-2.0-flash"       // another fallback
];

export const extractSkills = async (resumeText, jobDescription) => {
    console.log("Gemini service started");
    const prompt = `
    You are an expert technical recruiter.
    Your task is to extract and NORMALIZE technical skills from both the candidate's resume and the job description.
    Resume:
    """
    ${resumeText}
    """
    ----------------------------------------
    
    Job Description:
    """
    ${jobDescription}
    """

    Normalization Rules:
    - Remove duplicates.
    - Ignore capitalization.
    - Return only technical skills.
    - Do NOT include soft skills.
    - Normalize equivalent technologies.

    Return ONLY valid JSON.

    {
        "resumeSummary":"",
        "jdSummary":"",
        "resumeSkills":[],
        "jdSkills":[
            {
                "name":"",
                "important":true
            }
        ]
        "yourThoughts":"",
        "yourSuggestion":"",
    }

    Rules:
    • resumeSummary should be 1 concise sentence summarizing the resume.
    • jdSummary should be 1 concise sentence summarizing the job description.
    • Extract only technical skills.
    • Remove duplicates.
    • Normalize equivalent technologies.
    • Ignore capitalization.
    • Do NOT include soft skills.
    For each JD skill determine if it is important.
    Mark important=true if the JD indicates:
    - required
    - must
    - mandatory
    - essential
    - strong experience
    - expertise
    - preferred
    • on - "yourThoughts" write 1 line why he/she should/shouldn't be hired
    • on - "yourSuggestion" write 1-2 line where he/she should improve on



    Otherwise important=false, if you think its not that important`;

    console.log("Calling Gemini...");

    // const response = await ai.models.generateContent({
    //     model: "gemini-2.5-flash",
    //     contents: prompt,
    // });

    let lastError;

    for (const model of geminiModels) {
        try {
            console.log(`Trying ${model}...`);

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
            });

            return response.text;
        } catch (err) {
            lastError = err;

            // Only try the next model for temporary availability errors
            if (err?.status === 503 || err?.error?.code === 503) {
                console.log(`${model} unavailable, trying next...`);
                continue;
            }

            // For other errors (400, 401, etc.), don't retry
            throw err;
        }
    }

    throw lastError;

    // console.log("Gemini responded");
};


export const generateVerdict = async (comparison) => {

    const prompt = `
    You are an experienced technical recruiter.
    Based on the following comparison decide whether the candidate should be hired.
    Matched Skills:
    ${comparison.matchedSkills.map(s => s.name).join(", ")}    
    Missing Skills:
    ${comparison.missingSkills.map(s => s.name).join(", ")}    
    Match Percentage:
    ${comparison.matchPercentage}%    
    Return ONLY valid JSON.    
    {
      "verdict":"",
      "badge":"",
      "summary":"",
      "profileContext":"",
      currentJobRole:"",
      "breakdown":[
        {
          "title":"",
          "percentage":0,
          "color":"green|orange|red|blue"
        }
      ],
      "insights":[
        {
          "type":"positive|warning|negative",
          "title":"",
          "description":""
        }
      ]
    }
    
    Rules    
    currentJobRole should what his his current job role eg-software developer, or frontend engineer, devops etc (just 1 overall role)

    Verdict must be exactly one of    
    Qualified
    Almost There
    Not Yet
    
    badge should be one of    
    TOP CANDIDATE
    SECONDARY CANDIDATE BATCH
    NOT RECOMMENDED
    
    summary should be one concise sentence.
    
    profileContext should explain overall suitability in 1-2 sentences.
    
    Generate exactly 3 breakdown items.
    
    Generate exactly 3 insights.
    
    Each insight must have
    
    type
    title
    description
    
    Do not hallucinate years of experience.
    
    Base every statement only on supplied skills.`;

    // const response = await ai.models.generateContent({
    //     model: "gemini-2.5-flash",
    //     contents: prompt,
    // });

    let lastError;

    for (const model of geminiModels) {
        try {
            console.log(`Trying ${model}...`);

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
            });

            return response.text;
        } catch (err) {
            lastError = err;

            // Only try the next model for temporary availability errors
            if (err?.status === 503 || err?.error?.code === 503) {
                console.log(`${model} unavailable, trying next...`);
                continue;
            }

            // For other errors (400, 401, etc.), don't retry
            throw err;
        }
    }

    throw lastError;
};