import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../utils/userContext";

function Profile() {
  const [currUser, setCurrUser] = useContext(UserContext);
  useEffect(() => {
    console.log("useEffect in profile", currUser);
  });

  return (
    <div className="container">
      <div className="text-center">
        <h1>Hello {currUser.name}!</h1>
      </div>
      <h3>You have {currUser.totalPoints} points now.</h3>
      <div>
        <h3>You've exchanged your points with these items:</h3>
        {currUser.exchangedRewards.map((r) => (
          <div key={r.timestamp}>
            <h5>
              {r.name} - {r.points} points
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
