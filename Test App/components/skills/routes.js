import express from "express";
import skillController from "./controller.js";

const router = express.Router();

router.get("/", skillController.getAllSkills);

router.get("/add", skillController.addSkillForm);
router.post("/add/submit", skillController.addSkill);

router.get("/edit", skillController.editSkillForm);
router.post("/edit/submit", skillController.editSkill);

router.get("/delete", skillController.deleteSkill);

router.get("/api", skillController.skillsApiListing);


export default router;