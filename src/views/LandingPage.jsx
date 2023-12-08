import Logo from "../assets/Logo.svg";
import LoginScreen from "./LoginPage";

export default function LandingPage() {
  return (
    <body>
      <header className="app_header">
        <img src={Logo} alt="OMG logo" className="logo" />

        <div className="btnwrapper">
          <button className="loginbtn" onClick={() => <LoginScreen />}>Login</button>
          <button className="signupbtn">Sign-up</button>
        </div>
      </header>
    </body>
  );
}
