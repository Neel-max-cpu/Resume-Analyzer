import PDFParser from "pdf2json";

const extractPdfText = (buffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", (errData) => {
            reject(errData.parserError);
        });

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            let text = "";

            pdfData.Pages.forEach((page) => {
                page.Texts.forEach((item) => {
                    item.R.forEach((run) => {
                        if (!run?.T) return;

                        try {
                            text += decodeURIComponent(run.T) + " ";
                        } catch {
                            text += run.T;
                        }

                        text += " ";
                    });
                });
                text += "\n";
            });

            resolve(text);
        });

        pdfParser.parseBuffer(buffer);
    });
};

export default extractPdfText;