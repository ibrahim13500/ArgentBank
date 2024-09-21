import React from "react";
import "./Form.scss";
import loginUser from "../../services/api/LoginUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        dispatch(setIsLogin(true));
        dispatch(setToken(response.body.token));
        navigate("/profile");
      } else {
        setError(true);
        navigate("/login");
      }
    } catch (error) {
      setError(true);
      throw new Error(`Erreur d'authentification : ${error}`);
    }
  };

  return (
    <section className="form">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username" // Correction ici
          />
        </div>
        <div className="form__input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" // Correction ici
          />
        </div>
        <div className="form__check">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {error && (
          <p className="form__loginError">
            Please provide the correct username.
          </p>
        )}
        <button className="form__btn">Sign In</button>
      </form>
    </section>
  );
};

// Export Form
export default Form;
