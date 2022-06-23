import React, { useState, useEffect } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
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
import { UserContext } from "./utils/userContext";
import "./App.css";

function App() {
  const [currUser, setCurrUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect in App");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("inside: ", user);
        const userData = await getCurrUser(user.uid);
        console.log("Got userData from userService", userData);
        await setCurrUser(userData);
        // setCurrUser(userData);
      }
    });
  }, []);

  const updateCurrUser = async (user) => {
    console.log("updateCurrUser: ", user);
    if (user) {
      const uid = user.uid;
      const theUser = await getCurrUser(uid);
      console.log("theUser", theUser);
      await setCurrUser(theUser);
      console.log("After toggleUser - currUser: ", currUser);

      // setCurrUser(theUser);
    }
  };

  return (
    <UserContext.Provider value={[currUser, setCurrUser]}>
      <Header />
      <div className="content">
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
          {/* <Route path="/" element={currUser ? navigate("/tasks") : <Home />} /> */}
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

// import React, { useState, useEffect } from "react";
// import { Route, Navigate, Routes } from "react-router-dom";
// import { auth, db } from "./firebase-config";
// import Header from "./components/header/header";
// import Tasks from "./components/tasks/tasks";
// import Exchange from "./components/exchange/exchange";
// import RegisterForm from "./components/registerForm/registerForm";
// import LoginForm from "./components/loginForm/loginForm";
// import Profile from "./components/profile/profile";
// import Home from "./components/home/home";
// import Reset from "./components/reset/reset";
// import { getCurrUser } from "./firebase/userService";
// import {
//   UserProvider,
//   useCurrUser,
//   useCurrUserUpdate,
// } from "./utils/userContext";
// import "./App.css";

// function App() {
//   const currUser = useCurrUser();
//   const toggleUser = useCurrUserUpdate();

//   useEffect(() => {
//     console.log("useEffect in App");
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         console.log("inside: ", user);
//         const userData = await getCurrUser(user.uid);
//         console.log("Got userData from userService", userData);
//         toggleUser(userData);
//         // setCurrUser(userData);
//       }
//     });
//   }, []);

//   const handleUser = async (user) => {
//     console.log("handleUser: ", user);
//     if (user) {
//       const uid = user.uid;
//       const theUser = await getCurrUser(uid);
//       toggleUser(theUser);
//       console.log("After toggleUser - currUser: ", currUser);

//       // setCurrUser(theUser);
//     }
//   };

//   return (
//     <UserProvider>
//       <React.Fragment>
//         <Header user={currUser} />
//         <div className="content">
//           <Routes>
//             <Route path="/login" element={<LoginForm onUser={handleUser} />} />
//             <Route
//               path="/register"
//               element={<RegisterForm onUser={handleUser} />}
//             />
//             <Route path="/reset" element={<Reset />} />
//             <Route path="/tasks" element={<Tasks />} />
//             <Route path="/exchange" element={<Exchange user={currUser} />} />
//             <Route path="/profile/:id" element={<Profile user={currUser} />} />
//             <Route path="/" element={currUser ? <Tasks /> : <Home />} />
//             <Route
//               path="*"
//               element={
//                 <main>
//                   <p>Error: 404</p>
//                 </main>
//               }
//             />
//           </Routes>
//         </div>
//       </React.Fragment>
//     </UserProvider>
//   );
// }

// export default App;
