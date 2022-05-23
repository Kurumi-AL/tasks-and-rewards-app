import React, { Component } from "react";

class Profile extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Profile of {user}</h1>
      </div>
    );
  }
}

export default Profile;
