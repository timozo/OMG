import Logo from "../assets/Logo.svg";

export default function LandingPage() {
  return (
    <body>
      <header className="app_header">
        <img src={Logo} alt="OMG logo" className="logo" />

        <div className="btn_wrapper">
          <button className="login_btn">Login</button>
          <button className="signup_btn">Sign-up</button>
        </div>
      </header>
    </body>
  );
}
