import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../utils/userContext";
import "./home.css";

const Home = () => {
  const [currUser, setCurrUser] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currUser) navigate("/tasks");
  }, [currUser]);

  // Navigate the user to '/path'
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
