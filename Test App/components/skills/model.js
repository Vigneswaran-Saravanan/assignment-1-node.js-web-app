
import mongoose from "mongoose";

// Set Up Schema and model
const SkillSchema = new mongoose.Schema({
    name : String,
    level : String,
    category: String

});

const Skill = mongoose.model("Skill", SkillSchema);

// MONGODB FUNCTIONS

// Get all skills
async function getSkills(){
    return await Skill.find({});
 }

 //Get single skill
 async function getSingleSkill(id) {
  return await Skill.findById(id);
}

 // Initialize skills collection with some data

async function initializeSkills(){
    const skillList = [
        {
            name: "HTML",
            level: "Advance",
            category: "Frontend"
        },

        {
            name: "CSS",
            level: "Advance",
            category: "Frontend"

        },
        {
            name:"JavaScript",
            level:"Advance",
            category:"Frontend"
        },
        {
            name:"Node.js",
            level:"Beginner",
            category:"Backend"
        },
    ];

    await Skill.insertMany(skillList)
 }

// Add skill
async function addSkill(skill) {
  const newSkill = new Skill(skill);
  await newSkill.save();
}

// Edit skill
async function editSkill(id, skill) {
  await Skill.findByIdAndUpdate(id, skill);
}

// Delete skill
async function deleteSkill(id) {
  await Skill.findByIdAndDelete(id);
}

 export default{
    getSkills,
    getSingleSkill,
    initializeSkills,
    addSkill,
    editSkill,
    deleteSkill
 };