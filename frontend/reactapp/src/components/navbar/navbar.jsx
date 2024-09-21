// Import modules:
import React from "react";
import "./Navbar.scss";
import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import spinner from "../../assets/svg/spinner.svg";


const Navbar = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.loginUser.isLogin);
  const firstName = useSelector(state => state.getUserProfile.firstName);
  const token = useSelector(state => state.loginUser.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token === null && location.pathname === "/profile") {
      navigate("/login");
      dispatch(setIsLogin(false));
      dispatch(setToken(null));
    } else if (token) {
      dispatch(setIsLogin(true));
      dispatch(setToken(token));

      const getUserProfile = async () => {
        try {
          setIsLoading(true);
          const response = await getUser(token);
          if (response.status === 200) {
            dispatch(setFirstName(response.body.firstName));
            dispatch(setLastName(response.body.lastName));
            setIsLoading(false);
            setError(false);
          }
        } catch (error) {
          setError(true);
          setIsLoading(false);
          throw new Error(
            `Error retrieving user profile. Please try again later, ${error}`
          );
        }

        const handlePopstate = () => {
          dispatch(setIsLogin(false));
          dispatch(setToken(null));
          navigate("/");
        };

        window.addEventListener("popstate", handlePopstate);

        return () => {
          window.removeEventListener("popstate", handlePopstate);
        };
      };

      if (loginUser) {
        getUserProfile();
      }
    }
  }, [dispatch, location, loginUser, navigate, token]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setIsLogin(false));
    dispatch(setToken(null));
    navigate("/");
  };

  return (
    <header>
      <nav className="nav">
        <div className="nav__logo">
          <NavLink to={loginUser ? "/profile" : "/"}>
            <img src={argentBankLogo} alt="Argent Bank Logo" />
            <h1>Argent Bank</h1>
          </NavLink>
        </div>
        <div className="nav__login">
          <NavLink to={loginUser ? "/profile" : "/login"}>
            <i className="fa fa-user-circle"></i>
            {loginUser ? (
              <p>
                {isLoading ? (
                  <img src={spinner} alt="loading..." />
                ) : error ? (
                  "Null"
                ) : (
                  firstName
                )}
              </p>
            ) : (
              <p>Sign In</p>
            )}
          </NavLink>
          {loginUser && (
            <button type="submit" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              <p>Sign Out</p>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

// Export Navbar
export default Navbar;
