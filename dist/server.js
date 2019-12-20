"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import vhost from "vhost";
// const vhost = require("vhost");
const app = express_1.default();
// const server = require("http").Server(app);
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(cors_1.default());
// app.use(
//   vhost(`*.${config.domain[app.settings.env]}`, async (req, res, next) => {
//     const subDomain = req.vhost.host.split(".")[0];
//     const project = await db.Projects.findOne({
//       where: { uuid: subDomain }
//     });
//     if (!project) return next(ERROR_CODES.MAI.MAI_PROJECT_NOT_FOUND);
//     if (project.dataValues) {
//       req.current_project = project.dataValues;
//       const subApp = await require("./src/mocker-api-interface").app(
//         project.dataValues
//       );
//       return subApp(req, res, next);
//     }
//   })
// );
const PORT = process.env.PORT;
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at http://mockend.lvh.me:${PORT}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map