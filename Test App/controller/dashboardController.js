import projectModel from "../components/project/model.js";

const getDashboard = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  // Fetch all projects (or whatever else you want)
  const projects = await projectModel.getProjects();

  // Pass user and projects to the template
  res.render("admin/dashboard", {
    user: req.session.user,   
    projects: projects || [] 
  });
};

export default { getDashboard };