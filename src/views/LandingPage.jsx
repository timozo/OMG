import Logo from "../assets/Logo.svg";

export default function LandingPage() {
  return (
    <body>
      <header className="appHeader">
        <img src={Logo} alt="OMG logo" className="logo" />

        <div className="btnwrapper">
          <button className="loginbtn">Login</button>
          <button className="signupbtn">Sign-up</button>
        </div>
      </header>
    </body>
  );
}
