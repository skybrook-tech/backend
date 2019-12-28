import lodash from "lodash";
import _config from "../_config";
import routes from "./routes";
import setupServerDefaults from "./utils/setup-server-defaults";
// import vhost from "vhost";
// const vhost = require("vhost");

const app = setupServerDefaults({ routes });

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

const PORT = process.env.NODE_ENV === "test" ? 3071 : process.env.PORT;

const DOMAIN = lodash.get(_config, `domain.${process.env.NODE_ENV}`);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});

export default app;
