import React, { Component } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import auth from "./services/authService";
import Exchange from "./components/exchange/exchange";
import RegisterForm from "./components/registerForm/registerForm";
import "./App.css";
import LoginForm from "./components/loginForm/loginForm";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <Header user={user} />
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/profile/:id" element={<Profile />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={user ? <Tasks /> : <Home />} />
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
      </React.Fragment>
    );
  }
}

export default App;
