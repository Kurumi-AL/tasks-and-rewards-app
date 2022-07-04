import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, generatePath } from "react-router-dom";
import { logout } from "../../firebase/logService";
import { auth, db } from "../../firebase-config";
import { getCurrUser } from "../../firebase/userService";

import Tasks from "../tasks/tasks";
import Exchange from "../exchange/exchange";
import logo from "../../pictures/logo.jpg";
import { UserContext } from "./../../utils/userContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./header.css";

const Header = () => {
  const [currUser, setCurrUser] = useContext(UserContext);

  return (
    // <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#features">Features</Nav.Link>
    //         <Nav.Link href="#pricing">Pricing</Nav.Link>
    //       </Nav>
    //       <Nav>
    //         <Nav.Link href="#deets">More deets</Nav.Link>
    //         <Nav.Link eventKey={2} href="#memes">
    //           Dank memes
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

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

                {/* <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text> Logged in as {currUser.name}</Navbar.Text>
                </Navbar.Collapse> */}
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
