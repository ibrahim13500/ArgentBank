import React from "react";
import "./Profile.scss";
import User from "../../components/user/user";
import Card from "../../components/card/Card";

const Profile = () => {
  return (
    <main className="container__profile">
      <User />
      <Card />
    </main>
  );
};

// Export Profile
export default Profile;
