import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
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
    <div className="row">
      <div className="col-md-4 mx-auto mt-4">
        <div className="card text-center card-auth">
          <h4 className="auth-header">Sign in</h4>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="auth-inp"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={inputChange}
                />
            </div>
            <div className="form-group">
              <input
                className="auth-inp"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={inputChange}
              />
            </div>
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
          <p className="auth-p">Don't have an account? Sign up <Link to="/signup">here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
