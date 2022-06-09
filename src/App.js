import React, { Component } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { auth, db } from "./firebase-config";
import Header from "./components/header/header";
import Tasks from "./components/tasks/tasks";
import Exchange from "./components/exchange/exchange";
import RegisterForm from "./components/registerForm/registerForm";
import LoginForm from "./components/loginForm/loginForm";
import Profile from "./components/profile/profile";
import Home from "./components/home/home";
import Reset from "./components/reset/reset";
import { getCurrUser } from "./firebase/userService";
import { userContext } from "./utils/userContext";
import "./App.css";

class App extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    console.log("App component did mount");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getCurrUser(user.uid);
        this.setState({ user: userData });
      }
    });

    // const [currentUser, loading, error] = useAuthState(auth);

    // const currentUser = auth.currentUser;
    // console.log("App component did mount");
    // if (currentUser) {
    //   const user = await getCurrUser(currentUser.uid);
    //   console.log("App/componentDidMount user: ", currentUser);
    //   this.setState({ user });
    // }
  }

  handleUser = async (user) => {
    console.log("handleUser: ", user);
    if (user) {
      const uid = user.uid;
      const theUser = await getCurrUser(uid);
      this.setState({ user: theUser });
    }
  };

  // async fetchUser(uid) {
  //   const response = db.collection("users");
  //   const data = await response.get();
  //   return data.docs.forEach((user) => user.uid === uid);
  // }

  render() {
    const { user } = this.state;
    console.log("App render: ", user);

    return (
      <userContext.Provider value={this.state.user}>
        <React.Fragment>
          <Header user={user} />
          <div className="content">
            <Routes>
              <Route
                path="/login"
                element={<LoginForm onUser={this.handleUser} />}
              />
              <Route
                path="/register"
                element={<RegisterForm onUser={this.handleUser} />}
              />
              <Route path="/reset" element={<Reset />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/exchange" element={<Exchange user={user} />} />
              <Route path="/profile/:id" element={<Profile user={user} />} />
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
      </userContext.Provider>
    );
  }
}

export default App;
