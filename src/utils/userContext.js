import React from "react";
export const UserContext = React.createContext();

// import React, { useContext, useState } from "react";

// const UserContext = React.createContext();
// const UserUpdateContext = React.createContext();

// export function useCurrUser() {
//   return useContext(UserContext);
// }

// export function useCurrUserUpdate() {
//   return useContext(UserUpdateContext);
// }

// export function UserProvider({ children }) {
//   const [currUser, setCurrUser] = useState(null);

//   function toggleUser(user) {
//     console.log("toggleUser: ", user);
//     setCurrUser(user);
//   }

//   return (
//     <UserContext.Provider value={currUser}>
//       <UserUpdateContext.Provider value={toggleUser}>
//         {children}
//       </UserUpdateContext.Provider>
//     </UserContext.Provider>
//   );
// }
