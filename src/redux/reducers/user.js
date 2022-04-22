const initial_state = {
  id: 0,
  username: "",
  email: "",
};

const userReducer = (state = initial_state, action) => {
  if (action.type === "USER_LOGIN") {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      id: action.payload.id,
    };
  } else if (action.type === "USER_LOGOUT") {
    return initial_state;
  }
  return state;
};

export default userReducer;
