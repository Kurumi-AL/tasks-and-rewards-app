import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

function Profile() {
  const [currUser, setCurrUser] = useContext(UserContext);
  useEffect(() => {
    console.log("useEffect in profile", currUser);
  });

  return (
    <div>
      <h1>Profile of {currUser.name}</h1>
    </div>
  );
}

export default Profile;
