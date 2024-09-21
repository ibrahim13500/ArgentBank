// Import modules:
import React from "react";
import "./Error.scss";
import notFound from "../../assets/svg/notFound.svg";
import { NavLink } from "react-router-dom";


const Error = () => {
  return (
    <section className="error">
      <img src={notFound} alt="image 404" />
      <p>Oops ! The page you are requesting does not exist.</p>
      <NavLink to="/">
        <span>Return to home page</span>
      </NavLink>
    </section>
  );
};

// Export Error
export default Error;
