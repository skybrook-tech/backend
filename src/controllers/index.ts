import columns from "./columns";
import models from "./models";
import projects from "./projects";
import users from "./users";

interface Controllers {
  columns: any;
  models: any;
  projects: any;
  users: any;
}

const controllers = {
  columns,
  models,
  projects,
  users
} as Controllers;

export default controllers;
