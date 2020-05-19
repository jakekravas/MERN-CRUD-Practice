import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, error, loadUser, logout } = authContext;

  const onLogout = () => {
    logout();
  }

  const linksForUser = (
    <ul className="m-0">
      Hello {user && user.name}
      <Link onClick={onLogout} className="text-light px-2" to="/#">Sign Out</Link>
    </ul>
  );

  const linksForGuest = (
    <ul className="m-0">
      <Link className="text-light px-2" to="/signup">Sign Up</Link>
      <Link className="text-light px-2" to="/signin">Sign In</Link>
    </ul>
  );

  return (
    <nav className="navbar text-light bg-dark">
       <h2>Note Taker</h2>
       {isAuthenticated ? linksForUser : linksForGuest}
    </nav>
  )
}

export default Navbar;