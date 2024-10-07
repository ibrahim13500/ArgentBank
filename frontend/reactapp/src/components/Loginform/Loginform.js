import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "../../Redux/Authactions.js";

// Validation simplifiée de l'email
const ValidEmail = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return false; // Vérifie si l'email contient un '@'
  const dotIndex = email.indexOf(".", atIndex);
  return dotIndex > atIndex + 1; // Vérifie qu'il y a un '.' après le '@'
};

// Validation simplifiée du mot de passe
const ValidPassword = (password) => {
  if (password.length < 3) return false; // Mot de passe doit contenir au moins 3 caractères

  let hasLetter = false;
  let hasNumber = false;

  // Boucle pour vérifier si le mot de passe contient à la fois une lettre et un chiffre
  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (/[A-Za-z]/.test(char)) {
      hasLetter = true; // Contient une lettre
    } else if (/[0-9]/.test(char)) {
      hasNumber = true; // Contient un chiffre
    }

    if (hasLetter && hasNumber) return true; // Si les deux conditions sont remplies, le mot de passe est valide
  }

  return hasLetter && hasNumber; // Renvoie false si une des conditions n'est pas remplie
};

function Loginform() {
  // États locaux pour gérer les valeurs du formulaire et les messages d'erreur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Utilisation de hooks de React Router et Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fonction déclenchée lors de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Validation de l'email et du mot de passe
    if (!ValidEmail(email)) {
      setErrorMessage("Adresse email invalide");
      return; // Stoppe l'exécution si l'email est invalide
    }
    if (!ValidPassword(password)) {
      setErrorMessage("Mot de passe invalide");
      return; // Stoppe l'exécution si le mot de passe est invalide
    }

    // Tentative de connexion à l'API avec fetch
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envoie l'email et le mot de passe au backend
      });

      if (response.ok) {
        // Si la connexion réussit, récupère le token de réponse
        const data = await response.json();
        const token = data.body.token;

        // Dispatch de l'action loginSuccess pour enregistrer le token dans Redux
        dispatch(loginSuccess(token));

        // Stocke le token dans sessionStorage ou localStorage selon l'option "se souvenir de moi"
        sessionStorage.setItem("token", token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }

        // Redirection vers la page de profil après la connexion
        navigate("/Userpage");
      } else {
        // Si la requête échoue, déclenche l'action loginFailed avec un message d'erreur
        const error = "Email/mot de passe incorrect";
        dispatch(loginFailed(error));
      }
    } catch (error) {
      console.error(error); // Gère les erreurs réseau
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle"></i>
      <h2>Se Connecter</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
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
        {/* Champ mot de passe */}
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
        {/* Option "se souvenir de moi" */}
        <div className="input-remember">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Se souvenir de moi</label>
        </div>
        {/* Bouton de soumission */}
        <button className="sign-in-button">Se Connecter</button>
        {/* Affichage du message d'erreur si une erreur est présente */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Loginform;
