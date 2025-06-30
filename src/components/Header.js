import { LOGO_URL } from "../util/constants";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useUserStatus from "../util/useUserStatus";
export const Header = () => {
  const [logged, setLogged] = useState("Login");
  const isOnline = useUserStatus();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex justify-between light bg-orange-100 shadow-lg h-25">
      <div className="logo-container">
        <Link className="linkStyle" to="/">
          <img className="mx-4 mt-3 w-12 h-12 cursor-pointer" src={LOGO_URL} />
        </Link>

        <h1 className="app-name">
          <Link className=" mx-4 cursor-pointer" to="/">
            Food It
          </Link>
        </h1>
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-3">Internet: {isOnline ? "✅" : "🔴"}</li>
          <li className="px-3">
            <Link className="linkStyle" to="/">
              Home
            </Link>
          </li>
          <li className="px-3">
            <Link className="linkStyle" to="/about">
              About Us
            </Link>
          </li>
          <li className="px-3">
            <Link className="linkStyle" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="px-3">
            <Link className="linkStyle" to="/grocery">
              Grocery
            </Link>
          </li>
          <li className="px-3">Cart</li>
          <li className="px-3">
            <button
              onClick={() =>
                logged === "Login" ? setLogged("Logout") : setLogged("Login")
              }
              className="cursor-pointer bg-orange-200 rounded-md h-7 w-15 hover:bg-orange-300
               transition-colors duration-150"
            >
              {logged}
            </button>
          </li>
          <li className="px-3">
            <button
              onClick={toggleTheme}
              className="cursor-pointer bg-orange-200 rounded-md h-7 w-20 hover:bg-orange-300 transition-colors duration-150"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
