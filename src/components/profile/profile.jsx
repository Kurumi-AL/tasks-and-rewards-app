import React, { Component } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ user }) => {
  const { id } = useParams();

  return (
    <div>
      <h1>Profile of {user.name}</h1>
    </div>
  );
};

export default Profile;
