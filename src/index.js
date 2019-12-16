const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const vhost = require("vhost");

require("dotenv").config();

app.use(express.json());

app.use(cors());

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

// const io = require("socket.io")(server);
// const { db } = require("db-models");
// const middleware = require("middleware-rest");
// const ERROR_CODES = require("constants/error-codes");
// const { ApolloServer } = require("apollo-server-express");
// const { typeDefs, resolvers } = require("./src/graphql/schema/private");
// const schemaRoutes = require("./src/utils/rest-generator");
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://mockend.lvh.me:${PORT}`);
});

module.exports = app;
