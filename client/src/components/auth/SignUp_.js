import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/auth/authContext";

const SignUp = props => {
  const authContext = useContext(AuthContext);

  const { register, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated){
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {name, email, password} = user;

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === ""){
      alert("Please fill out all fields");
    } else {
      register({
        name,
        email,
        password
      })
    }
  }

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp