import users from "./users";
import projects from "./projects";

interface Controllers {
  users: any;
  projects: any;
}

const controllers = {
  users,
  projects
} as Controllers;

export default controllers;
