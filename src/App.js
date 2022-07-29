import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase-config";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import Exchange from "./components/exchange/exchange";
import RegisterForm from "./components/registerForm/registerForm";
import LoginForm from "./components/loginForm/loginForm";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";
import Reset from "./components/reset/reset";
import { getCurrUser } from "./firebase/userService";
import { UserContext } from "./utils/userContext";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getCurrUser(user.uid);
        await setCurrUser(userData);
      }
    });
  }, []);

  const updateCurrUser = async (user) => {
    if (user) {
      const uid = user.uid;
      const theUser = await getCurrUser(uid);
      await setCurrUser(theUser);
    }
  };

  return (
    <UserContext.Provider value={[currUser, setCurrUser]}>
      <ToastContainer />
      <Header />

      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<LoginForm updateCurrUser={updateCurrUser} />}
          />
          <Route
            path="/register"
            element={<RegisterForm updateCurrUser={updateCurrUser} />}
          />
          <Route path="/reset" element={<Reset />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={
              <main>
                <p>Error: 404</p>
              </main>
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
