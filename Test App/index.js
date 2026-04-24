import "dotenv/config";
import express, { Router } from "express";
import path from "path"; 
import sessions from "express-session";
import { connect } from "./db.js";
import cors from "cors";

//Routers
import userRouter from "./components/user/routes.js";
import projectRoutes from "./components/project/routes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import skillRoutes from "./components/skills/routes.js";

//connect to Database
connect();

const __dirname = import.meta.dirname;

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

app.use(cors());

//set up application template engine
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "pug");


//Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
  })
);

//set up middleware function to check if user logged
app.use("/user", (request, response, next) => {
  //get user from session and go to next middleware function
  if (request.session.loggedIn) {
    app.locals.user = request.session.user;
    next();
  } else {
     response.redirect("/login");
  }
});

app.use("/admin", (req, res, next) => {
  if (req.path.includes("/api")) {
    return next();
  }

  if (req.session.loggedIn) {
    app.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/login");
  }
});

app.use("/logout", (request, response, next) => {
  app.locals.user = null;
  next();
});


app.get("/login", (req, res) => {
  res.render("user/login", { err: null });
});

app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/user");   // go to dashboard if logged in
  } else {
    res.render("landing");   // show landing page if not logged in
  }
}); 
//POST
app.post("/login", (req, res) => {
  const { u, pw } = req.body;
  const USERNAME = process.env.DBUSER;
  const PASSWORD = process.env.DBPWD;

  if (u === USERNAME && pw === PASSWORD) {
    req.session.user = { username: u };    
    req.session.loggedIn = true;          
    res.redirect("/user");         
  } else {
    res.render("user/login", { err: "Invalid username or password", user: null });
  }
});


//Routes

app.use("/", userRouter);
app.use("/admin/projects", projectRoutes);
app.use("/admin/dashboard", dashboardRoutes);
app.use("/admin/skills", skillRoutes);


//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

