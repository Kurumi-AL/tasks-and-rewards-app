import React, { Component } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import RegisterForm from "./components/registerForm/registerForm";
import auth from "./services/authService";
import "./App.css";
import LoginForm from "./components/loginForm/loginForm";
import Logout from "./components/logout/logout";
import Exchange from "./components/exchange/exchange";

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
        <Tasks />

        {/* <ToastContainer />
        <Header user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/"
              element={<Navigate replace to="/tasks" component={Tasks} />}
            ></Route>

            <Navigate to="/not-found" />
          </Routes>
        </main> */}
      </React.Fragment>
    );
  }
}

export default App;
