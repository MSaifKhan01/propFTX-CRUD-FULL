import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <div id="logo">
        <img
          src="https://img.freepik.com/free-vector/movie-time-neon-sign-sign_24908-55544.jpg?w=740&t=st=1706168764~exp=1706169364~hmac=eb64d208dc311de069f5fd4c793533d3a833cee20f689036cea2ebb14171661c"

          
          alt=""
        />
      </div>
      {auth ?<ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/Register">Sign Up</Link>
        </li>

        <li>
          <Link to="/Movie">Add-Show-Movies </Link>
        </li>
        

        <li>
         
            <Link onClick={logout} to="/">
              Logout   ({auth})
            </Link>
          
        </li>
      </ul>
      :

      <ul className="nav-ul nav-right">
        <li>
          <Link to="/">Home </Link>
        </li>

        <li>
          <Link to="/Register">Sign Up</Link>
        </li>

        <li>
          <Link to="/Login">Login</Link>
        </li>

       
      </ul>
}
    </nav>
  );
};

export default Navbar;