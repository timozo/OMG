import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../services/firebase";
import "../MagicCard.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login with Firebase and error handling
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User:", user);
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("E-mail or password is incorrect");
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  // Navigate to SignupPage in the stack
  const handleSignup = () => {
    console.log("Signup");
  };

  return (
    <body>
      <div className="card">
        <h1 className="landing_header">Login</h1>
        <input
          className="login_form"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login_form"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn login" onClick={handleLogin}>
          Login
        </button>
        <div>
          <p className="login_prompt">
            Don't have an account? <span onClick={handleSignup}>Sign up</span>
          </p>
        </div>
      </div>
    </body>
  );
}
