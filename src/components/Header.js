import { LOGO_URL } from "../util/constants";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
export const Header = () => {
  const [logged, setLogged] = useState("Login");

  useEffect(() => {
    console.log("Header Rendered");
  });

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
        <h1 className="app-name">
          <Link className="linkStyle" to="/">
            Food It
          </Link>
        </h1>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link className="linkStyle" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="linkStyle" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="linkStyle" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>Cart</li>
          <li>
            <button
              onClick={() =>
                logged === "Login" ? setLogged("Logout") : setLogged("Login")
              }
              className="login-btn"
            >
              {logged}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
