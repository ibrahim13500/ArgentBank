import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "../../Redux/Authactions.js";

// Validation simplifiée de l'email
const ValidEmail = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return false;
  const dotIndex = email.indexOf(".", atIndex);
  return dotIndex > atIndex + 1;
};

// Validation simplifiée du mot de passe
const ValidPassword = (password) => {
  if (password.length < 3) return false;

  let hasLetter = false;
  let hasNumber = false;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (/[A-Za-z]/.test(char)) {
      hasLetter = true;
    } else if (/[0-9]/.test(char)) {
      hasNumber = true;
    }

    if (hasLetter && hasNumber) return true;
  }

  return hasLetter && hasNumber;
};

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ValidEmail(email)) {
      setErrorMessage("Adresse email invalide");
      return;
    }
    if (!ValidPassword(password)) {
      setErrorMessage("Mot de passe invalide");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.body.token;
        dispatch(loginSuccess(token));
        sessionStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
        navigate("/Userpage");
      } else {
        const error = "Email/mot de passe incorrect";
        dispatch(loginFailed(error));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle"></i>
      <h2>Se Connecter</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Mot de Passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="input-remember">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Se souvenir de moi</label>
        </div>
        <button className="sign-in-button">Se Connecter</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Loginform;
