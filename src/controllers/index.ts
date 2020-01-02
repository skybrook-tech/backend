import models from "./models";
import projects from "./projects";
import users from "./users";

interface Controllers {
  models: any;
  projects: any;
  users: any;
}

const controllers = {
  models,
  projects,
  users
} as Controllers;

export default controllers;
