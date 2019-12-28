const authErrors = {
  AUTH_NO_P_OR_U: {
    message: "No username or password provided.",
    status: 401,
    code: "AUTH_NO_P_OR_U"
  },
  AUTH_USER_EXISTS: {
    message: "An account with that email already exists.",
    status: 401,
    code: "AUTH_USER_EXISTS"
  }
};

export default authErrors;
