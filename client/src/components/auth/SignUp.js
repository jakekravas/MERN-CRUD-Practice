import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const SignUp = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, error, register } = authContext;

  useEffect(() => {
    if (isAuthenticated){
      props.history.push("/");
    }
  }, [isAuthenticated, error, props.history]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = newUser;

  const inputChange = e => setNewUser({
    ...newUser, [e.target.name]: e.target.value
  });

  const submitUser = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === ""){
      alert("Please fill out all fields");
    } else {
      register({
        name, email, password
      });
    }
  }

  return (
    <div className="row">
      <div className="col-md-4 mx-auto mt-4">
        <div className="card text-center card-auth">
          <h4 className="auth-header">Sign Up</h4>
          <form onSubmit={submitUser}>
            <div className="form-group">
              <input
                className="auth-inp"
                type="text"
                placeholder="Name"
                name="name"
                value={ name }
                onChange={inputChange}
                />
            </div>
            <div className="form-group">
              <input
                className="auth-inp"
                type="text"
                placeholder="Email"
                name="email"
                value={ email }
                onChange={inputChange}
                />
            </div>
            <div className="form-group">
              <input
                className="auth-inp"
                type="password"
                placeholder="Password"
                name="password"
                value={ password }
                onChange={inputChange}
              />
            </div>
            <button type="submit" className="auth-btn">Sign Up</button>
          </form>
          <p className="auth-p">Already have an account? Sign in <Link to="/signin">here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp;