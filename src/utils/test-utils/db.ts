const execSync = require("child_process").execSync;

const createDb = () => {
  return new Promise((resolve, reject) => {
    try {
      execSync("node_modules/.bin/sequelize db:create", { stdio: "inherit" });
      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

const dropDb = () => {
  return new Promise((resolve, reject) => {
    try {
      execSync("node_modules/.bin/sequelize db:drop", { stdio: "inherit" });
      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

const migrate = () => {
  return new Promise((resolve, reject) => {
    try {
      execSync("node_modules/.bin/sequelize db:migrate", { stdio: "inherit" });
      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

const dbUtils = { createDb, dropDb, migrate };

export default dbUtils;
