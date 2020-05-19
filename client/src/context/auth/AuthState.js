import React, { useReducer } from 'react';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token){
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: "USER_LOADED",
        payload: res.data
      })
    } catch (err) {
      dispatch({type: "AUTH_ERROR"})
    }
  }

  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

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
      });
    
    }
  };

  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data.msg
      });
    }
  }

  const logout = () => {
    dispatch({type: "LOGOUT"});
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        loadUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;