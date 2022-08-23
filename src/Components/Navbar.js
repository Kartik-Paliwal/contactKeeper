import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import {useNavigate,Link } from "react-router-dom";
// import Signup
const Navbar = () => {
  let history= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faAddressBook} /> contactKeeper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!localStorage.getItem('token')?
          <div className="d-flex">
            <Link className={`nav-link  mx-1 my-1 active`} to="/signup">
              Signup
            </Link>
            <Link className="nav-link  mx-1 my-1 active " to="/login">
              Login
            </Link>
          </div>
            :<Link className="nav-link  mx-1 my-1 active " onClick={handleLogout}>
              LogOut
            </Link>
            }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
