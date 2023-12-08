import Logo from "../assets/Logo.svg";
import LoginScreen from "./LoginPage";
import { NavLink } from 'react-router-dom';

export default function LandingPage() {
  return (
    <body>
      <header className="app_header">
        <img src={Logo} alt="OMG logo" className="logo" />

        <div className="btnwrapper">
        <NavLink to="/login" className="login_btn">
          Login
        </NavLink>
        <NavLink to="/signup" className="signup_btn">
          Sign-up
        </NavLink>
      </div>
      </header>
    </body>
  );
}
