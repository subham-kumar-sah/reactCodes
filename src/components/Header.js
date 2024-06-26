import { LOGO_URL } from "../util/constants";
import { Link } from "react-router-dom";
export const Header = () => {
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
        </ul>
      </div>
    </div>
  );
};

export default Header;
