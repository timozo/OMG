import Logo from "../assets/Logo.svg";
import "../Header.css";
import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(true);

  function hamburgerToggle() {
    setOpen(!isOpen)
  }

  const location = useLocation();

  useEffect(() => {
    setOpen(false)
  }, [location]);

  return (
    <div className="app_header">
      <div className="background_container">
        <div className="container">
          <div className="links">
            <Link to="/"><img src={Logo} alt="OMG logo" className="logo" /></Link>

            <div className={`menu_container${isOpen ? " visible" : ""}`}>
              <div className="nav_wrapper">
                <NavLink to="/courses" className="nav_link">All Courses</NavLink>
                <NavLink to="/ezpz" className="nav_link">Easy Credits</NavLink>
              </div>

              <div className="btn_wrapper">
                <NavLink to="/login" className="btn outline">Login</NavLink>
                <NavLink to="/signup" className="btn filled">Sign-up</NavLink>
              </div>
            </div>

            <label onClick={hamburgerToggle} htmlFor="hamburger_check" id="btn_menu_container"><span>☰</span></label>
          </div>
        </div>
      </div>
    </div>
  );
}