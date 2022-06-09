import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../utils/userContext";

function Profile() {
  const user = useContext(userContext);
  useEffect(() => {});

  return (
    <div>
      <h1>Profile of {user.name}</h1>
    </div>
  );
}

export default Profile;
