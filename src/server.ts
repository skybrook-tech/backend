import lodash from "lodash";
import _config from "../_config";
import routes from "./routes";
import setupServerDefaults from "./utils/setup-server-defaults";

const app = setupServerDefaults({ routes });

const PORT = process.env.NODE_ENV === "test" ? 3071 : _config.PORT;

const DOMAIN = _config.DOMAIN;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});

export default app;
