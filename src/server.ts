import _config from "../_config";
import routes from "./routes";
import setupServerDefaults from "./core/utils/setup-server-defaults";

const app = setupServerDefaults({ routes });

const PORT = process.env.NODE_ENV === "test" ? 3071 : _config.PORT;

const DOMAIN = _config.DOMAIN;

app.listen(PORT, () => {
  console.log(`Server ready at http://${DOMAIN}:${PORT}`);
});

export default app;
