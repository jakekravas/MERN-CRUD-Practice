import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar text-light bg-dark">
       <h2>Note Taker</h2>
       <ul className="m-0">
         <Link className="text-light px-2" to="/signup">Sign Up</Link>
         <Link className="text-light px-2" to="/signin">Sign In</Link>
       </ul>
    </nav>
  )
}

export default Navbar;