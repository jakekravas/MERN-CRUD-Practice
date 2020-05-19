import React, { useEffect, useState, useContext } from 'react';
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
    <form onSubmit={submitUser}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={ name }
          onChange={inputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={ email }
          onChange={inputChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={ password }
          onChange={inputChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp;