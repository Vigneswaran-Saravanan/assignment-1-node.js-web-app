import express from "express";
import projectController from "./controller.js";

const router = express.Router();

router.get("/", projectController.getAllProjects);

router.get("/add", projectController.addProjectForm);
router.post("/add/submit", projectController.addProject);

router.get("/edit", projectController.editProjectForm);
router.post("/edit/submit", projectController.editProject);

router.get("/delete", projectController.deleteProject);

router.get("/api", projectController.projectsApiListing);


export default router;