import Logo from "../assets/Logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="app_header">
      <img src={Logo} alt="OMG logo" className="logo" />

      <div className="nav_wrapper">
        <NavLink to="/courses" className="nav_link">
          All Courses
        </NavLink>
        <NavLink to="/ezpz" className="nav_link">
          Easy Credits
        </NavLink>
      </div>

      <div className="btn_wrapper">
        <NavLink to="/login" className="login_btn">
          Login
        </NavLink>
        <NavLink to="/signup" className="signup_btn">
          Sign-up
        </NavLink>
      </div>
    </div>
  );
}
