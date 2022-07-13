import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../firebase/logService";
import logo from "../../pictures/logo.jpg";
import { UserContext } from "./../../utils/userContext";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./header.css";

const Header = () => {
  const [currUser, setCurrUser] = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} className="photo"></img>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!currUser && (
          <React.Fragment>
            <Nav className="me-auto">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </Nav>
          </React.Fragment>
        )}
        {currUser && (
          <React.Fragment>
            <Nav className="me-auto">
              <NavLink className="nav-item nav-link" to="/tasks">
                Tasks
              </NavLink>

              <NavLink className="nav-item nav-link" to="/exchange">
                Exchange
              </NavLink>

              <NavLink
                className="nav-item nav-link"
                to="/profile/${currUser.uid}"
              >
                Profile
              </NavLink>

              <Navbar.Text>
                <button className="nav-button" onClick={logout}>
                  Logout
                </button>
              </Navbar.Text>

              <Navbar.Text>
                Available Points: {currUser.totalPoints} pt
              </Navbar.Text>
            </Nav>
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
