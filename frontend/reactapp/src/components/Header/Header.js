import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../designs/img/argentBankLogo.webp";
import { logout } from "../../Redux/Authactions.js";

function Header() {
  /* Updates user data on header component from state redux */
  const isConnected = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.user.userData.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  return (
    <header>
      <h1 className="sr-only"></h1>
      <nav>
        <Link to="/">
          <img src={Logo} alt="Bank Logo" />
        </Link>
        {isConnected ? (
          <div className="connected">
            <Link to="/Userpage">
              <i className="fa fa-user-circle" />
              <p>{username}</p>
            </Link>
            <Link to="/" onClick={logoutHandler}>
              <i className="fa fa-sign-out" />
              <p> Sign out </p>
            </Link>
          </div>
        ) : (
          <div className="not-connected">
            <Link to="/login">
              <i className="fa fa-user-circle"></i>
              <p>Sign In</p>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
