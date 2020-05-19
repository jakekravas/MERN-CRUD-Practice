import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../context/auth/authContext";

const SignIn = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated, error } = authContext;

  const [liUser, setLiUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = liUser;

  useEffect(() => {
    if (isAuthenticated){
      props.history.push("/");
    }
  }, [isAuthenticated, error, props.history]);

  const inputChange = e => setLiUser({
    ...liUser, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === ""){
      alert("Please fill out all fields");
    } else {
      login({
        email, password
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={inputChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={inputChange}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  )
}

export default SignIn
