export default (state, action) => {
  switch(action.type){
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case "ADD_NOTE":
      return {
        ...state,
        notes: action.payload
      }
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        user: null,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}