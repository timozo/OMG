import Logo from "../assets/Logo.svg";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="app_header">
      <div className="background_container">
        <div className="container">
          <div className="links">
            <Link to="/"><img src={Logo} alt="OMG logo" className="logo" /></Link>
            <div className="nav_wrapper">
              <NavLink to="/courses" className="nav_link">
                All Courses
              </NavLink>
              <NavLink to="/ezpz" className="nav_link">
                Easy Credits
              </NavLink>
            </div>
          </div>

          <div className="btn_wrapper">
            <NavLink to="/login" className="btn outline">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn filled">
              Sign-up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
