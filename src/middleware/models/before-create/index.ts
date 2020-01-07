import addPrimaryKeyColumn from "./add-primary-key-column";

const beforeCreateMiddleware = [addPrimaryKeyColumn];

export default beforeCreateMiddleware;
