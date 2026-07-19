import { createSlice } from "@reduxjs/toolkit";


interface AnalysisState {    
    jobDescription: string;
    loading: boolean;
    mode: "skill-gap" | "verdict";
    result: any;    
    resumeName: string;
}

const initialState:AnalysisState = {
    mode: "skill-gap",    
    jobDescription: "",
    resumeName: "",
    result: null,
    loading: false,    
};

const analysisSlice = createSlice({
    name: "analysis",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },        

        setJobDescription: (state, action) => {
            state.jobDescription = action.payload;
        },

        setResumeName: (state, action) => {
            state.resumeName = action.payload;
        },

        setResult: (state, action) => {
            state.result = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        clearResult: (state) => {
            state.result = null;
        }
    }
});

export const {
    setMode,    
    setJobDescription,
    setResumeName,
    setResult,
    setLoading,
    clearResult
} = analysisSlice.actions;

export default analysisSlice.reducer;