import express from "express";
import {analyzeResume} from "../controller/analysis.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/analyze",
    upload.single("resume"),
    analyzeResume
);

export default router;