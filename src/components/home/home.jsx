import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  let navigate = useNavigate();
  const routeChange = (path) => {
    let newPath = "/" + path;
    navigate(newPath);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        The harder you work, the more rewards you can get!
      </h1>
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <div className="button">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={() => routeChange("register")}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={() => routeChange("login")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
};

export default Home;
