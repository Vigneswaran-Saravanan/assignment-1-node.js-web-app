import projectModel from "./model.js";

// Render all projects page
const getAllProjects = async (req, res) => {
  let projects = await projectModel.getProjects();
  if (!projects.length) {
    await projectModel.initializeProjects();
    projects = await projectModel.getProjects();
  }
  res.render("project/projects", { projects });
};

// Show add form
const addProjectForm = (req, res) => {
  res.render("project/project-add");
};

// Add project
const addProject = async (req, res) => {
  const { title, description, techStack, year, liveLink } = req.body;

  await projectModel.addProject({
    title,
    description,
    techStack: techStack.split(",").map(t => t.trim()),
    year: parseInt(year)
  });

  res.redirect("/admin/projects");
};

// Show edit form
const editProjectForm = async (req, res) => {
  const project = await projectModel.getSingleProject(req.query.id);
  res.render("project/project-edit", { project });
};

// Update project
const editProject = async (req, res) => {
  const { id, title, description, techStack, year, liveLink} = req.body;

  await projectModel.editProject(id, {
    title,
    description,
    techStack: techStack.split(",").map(t => t.trim()),
    year: parseInt(year)
  });

  res.redirect("/admin/projects");
};

// Delete project
const deleteProject = async (req, res) => {
  await projectModel.deleteProject(req.query.id);
  res.redirect("/admin/projects");
};

// JSON API - get all projects
const projectsApiListing = async (req, res) => {
  const projects = await projectModel.getProjects();
  res.json(projects);
};

export default {
  getAllProjects,
  projectsApiListing,
  addProjectForm,
  addProject,
  editProjectForm,
  editProject,
  deleteProject,
  projectsApiListing
};