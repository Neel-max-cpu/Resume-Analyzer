export const compareSkills = (resumeSkills, jdSkills) => {

    const resumeSet = new Set(
        resumeSkills.map(skill => skill.toLowerCase())
    );

    const matchedSkills = [];
    const missingSkills = [];

    jdSkills.forEach(skill => {
        if (resumeSet.has(skill.name.toLowerCase())) {
            matchedSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    });

    const matchPercentage =
        jdSkills.length === 0
            ? 0
            : Math.round(
                (matchedSkills.length / jdSkills.length) * 100
            );


    return {
        matchedSkills,
        missingSkills,
        matchPercentage
    };
};