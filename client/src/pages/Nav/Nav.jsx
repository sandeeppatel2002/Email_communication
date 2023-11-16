import { Link } from "react-router-dom";
import "./nav.css";

const TopBar = (userDetails) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="logo-text">Email Communication</span>
      </div>
      <div className="topbar-center">
        <ul className="topbar-list">
          <li className="topbar-item">
            <Link className="link" to="/">
              MAIL
            </Link>
          </li>
          <li className="topbar-item">
            <Link className="link" to="/history">
              HISTORY
            </Link>
          </li>
          <li className="topbar-item">
            <Link className="link" to="/profile">
              PROFILE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
