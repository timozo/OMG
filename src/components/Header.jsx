import Logo from "../assets/Logo.svg";
import "../Header.css";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false); // New state for authentication

  function hamburgerToggle() {
    setOpen(!isOpen);
  }

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Simulating user login/logout (replace with your authentication logic)
  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="app_header">
      <div className="background_container">
        <div className="container">
          <div className="links">
            <Link to="/">
              <img src={Logo} alt="OMG logo" className="logo" />
            </Link>

            <div className={`menu_container${isOpen ? " visible" : ""}`}>
              <div className="nav_wrapper">
                <NavLink to="/courses" className="nav_link">
                  All Courses
                </NavLink>
                <NavLink to="/ezpz" className="nav_link">
                  Easy Credits
                </NavLink>
              </div>

              <div className="btn_wrapper">
                {isAuthenticated ? (
                  // Render logout button if user is authenticated
                  <NavLink to="/" onClick={handleLogout} className="btn filled">
                    Logout
                  </NavLink>
                ) : (
                  // Render login and signup buttons if user is not authenticated
                  <>
                    <NavLink
                      to="/login"
                      className="btn outline"
                      onClick={handleLogin}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="btn filled"
                      onClick={handleLogin}
                    >
                      Sign-up
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            <label
              onClick={hamburgerToggle}
              htmlFor="hamburger_check"
              id="btn_menu_container"
            >
              <span>☰</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
