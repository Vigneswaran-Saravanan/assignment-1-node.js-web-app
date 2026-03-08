import mongoose from "mongoose";


// Set up Schema and model
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String], 
  year: Number
});

const Project = mongoose.model("Project", ProjectSchema);

// MONGODB FUNCTIONS

// Get all projects
async function getProjects() {
  return await Project.find({});
}

// Get single project
async function getSingleProject(id) {
  return await Project.findById(id);
}


// Initialize projects collection with some data
async function initializeProjects() {
  const projectList = [
    {
      title: "Portfolio Website",
      description: "Responsive personal portfolio using HTML, CSS, Bootstrap",
      techStack: ["HTML", "CSS", "Bootstrap"],
      year: 2024
    },
    {
      title: "Student Management System",
      description: "Manage student info using Django and MySQL",
      techStack: ["Django", "MySQL", "Python"],
      year: 2025
    }
  ];
  await Project.insertMany(projectList);
}

// Add project
async function addProject(project) {
  const newProject = new Project(project);
  await newProject.save();
}

// Edit project
async function editProject(id, project) {
  await Project.findByIdAndUpdate(id, project);
}

// Delete project
async function deleteProject(id) {
   await Project.findByIdAndDelete(id);
}

export default {
  getProjects,
  initializeProjects,
  addProject,
  getSingleProject,
  editProject,
  deleteProject
};