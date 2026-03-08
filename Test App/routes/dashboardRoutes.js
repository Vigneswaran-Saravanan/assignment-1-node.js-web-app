import express from "express";
import dashboardController from "../controller/dashboardController.js";

const router = express.Router();

// GET /dashboard
router.get("/", dashboardController.getDashboard);

export default router;