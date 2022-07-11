import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../firebase/logService";
import logo from "../../pictures/logo.jpg";
import { UserContext } from "./../../utils/userContext";
import { Navbar } from "react-bootstrap";
import "./header.css";

const Header = () => {
  const [currUser, setCurrUser] = useContext(UserContext);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} className="photo"></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {!currUser && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {currUser && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/tasks">
                  Tasks
                </NavLink>
                <NavLink className="nav-item nav-link" to="/exchange">
                  Exchange
                </NavLink>

                <NavLink
                  className="nav-item nav-link justify-content-end"
                  to="/profile/${currUser.uid}"
                >
                  Profile
                </NavLink>

                <Navbar.Collapse
                  className="justify-content-end"
                  onClick={logout}
                >
                  <button className="nav-button">Logout</button>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>You have {currUser.totalPoints} pt </Navbar.Text>
                </Navbar.Collapse>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
