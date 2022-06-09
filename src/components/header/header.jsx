import React, { useEffect, useState } from "react";
import { NavLink, Link, generatePath } from "react-router-dom";
import { logout } from "../../firebase/logService";
import Tasks from "../tasks/tasks";
import Exchange from "../exchange/exchange";
import logo from "../../pictures/logo.jpg";

import "./header.css";
import { Navbar } from "react-bootstrap";

const Header = ({ user }) => {
  console.log(user);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={user ? "/tasks" : "/"}>
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
            {!user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/tasks">
                  Tasks
                </NavLink>
                <NavLink className="nav-item nav-link" to="/exchange">
                  Exchange
                </NavLink>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text> Logging in as {user.name}</Navbar.Text>
                </Navbar.Collapse>
                <NavLink
                  className="nav-item nav-link justify-content-end"
                  to="/profile/${user.uid}"
                >
                  Profile
                </NavLink>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>{user.totalPoints} pt</Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse
                  className="justify-content-end"
                  onClick={logout}
                >
                  <Navbar.Text>Logout</Navbar.Text>
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
