export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const getUser = (user: any) => {
  return {
    type: "GET_USER",
    payload: user,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
