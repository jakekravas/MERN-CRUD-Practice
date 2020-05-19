import React, { useReducer } from 'react';
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token){
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      console.log(res.data);
      dispatch({
        type: "USER_LOADED",
        payload: res.data
      });
  
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" })
    }
  }

  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.response.data.msg
      })
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        loadUser,
        register
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;