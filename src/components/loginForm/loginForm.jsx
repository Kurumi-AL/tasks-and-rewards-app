import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/logService";
import { useAuthState } from "react-firebase-hooks/auth";
import { getCurrUser } from "./../../firebase/userService";
import { UserContext } from "./../../utils/userContext";
import "./loginForm.css";

const LoginForm = (props) => {
  const [currUser, setCurrUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [user, loading, error] = useAuthState(auth);
  // console.log("loginform got user from auth state", user);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect in loginForm");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getCurrUser(user.uid);
        setCurrUser(userData);
        navigate("/tasks");
      }
    });
  }, [currUser]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() =>
            logInWithEmailAndPassword(email, password, setCurrUser)
          }
        >
          Login
        </button>
        <button
          className="login__btn login__google"
          onCanPlay={signInWithGoogle}
          onClick={() => setCurrUser(currUser)}
        >
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
