import axiosInstance from "./axiosInstance";

export const API_PATHS={
    ANALYSE_PDF :"/api/analyze",    
}


export const anlysePdf = async(file:File, jobDesc:string, mode:string)=>{
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDesc);
    formData.append("mode", mode);

    const res = await axiosInstance.post(
        API_PATHS.ANALYSE_PDF,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            },
        }
    );

    return res?.data;
};