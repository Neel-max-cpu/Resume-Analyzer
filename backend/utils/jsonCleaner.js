const cleanJSON = (text) => {

    return JSON.parse(
        text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()
    );

};

export default cleanJSON;