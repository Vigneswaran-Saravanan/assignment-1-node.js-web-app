import skillModel from "./model.js";

// Render all skills page

const getAllSkills = async (req, res) => {
  let skills = await skillModel.getSkills();
  if(!skills.length){
    await skillModel.initializeSkills();
    skills = await skillModel.getSkills();
  }
  res.render("skill/skills", {skills});
};

// Show skill form 
const addSkillForm = (req, res) => {
  res.render("skill/skill-add");
};

// Add skill
const addSkill = async (req, res) => {
  const { name, level, category } = req.body;

  await skillModel.addSkill({ name, level, category });

  res.redirect("/admin/skills");
};

// Show edit form
const editSkillForm = async (req, res) => {
  const skill = await skillModel.getSingleSkill(req.query.id);
  res.render("skill/skill-edit", { skill });
};

// Update skill
const editSkill = async (req, res) => {
  const { id, name, level, category } = req.body;

  await skillModel.editSkill(id, { name, level, category });

  res.redirect("/admin/skills");
};

// Delete Skill
const deleteSkill = async (req, res) => {
  await skillModel.deleteSkill(req.query.id);
  res.redirect("/admin/skills");
};

// JSON API - get all skills
const skillsApiListing = async (req, res) => {
  const skills = await skillModel.getSkills();
  res.json(skills);
};

export default{
  getAllSkills,
  addSkillForm,
  addSkill,
  editSkillForm,
  editSkill,
  deleteSkill,
  skillsApiListing
};