import React, { useState } from "react";
import { createUserWithEmailAndPassword, auth } from "../services/firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "../services/firebase";
import "../MagicCard.css";

const db = getFirestore(app);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const userId = user.uid;

        // Create a document reference for the new user
        const collectionRef = collection(db, "users");
        const docRef = doc(collectionRef, userId);

        // Set the user UID in the document
        setDoc(docRef, { uid: userId })
          .then(() => {
            console.log("User UID saved successfully");
          })
          .catch((error) => {
            console.error("Error saving user UID:", error.message);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("The e-mail address is already in use");
        } else if (error.code === "auth/invalid-email") {
          alert("The e-mail address is not formatted correctly");
        } else if (password !== confirmPassword) {
          alert("Passwords don't match");
        } else if (error.code === "auth/weak-password") {
          alert("The password is too weak");
        } else {
          console.error("Error message:", error.message);
        }
      });
  };

  return (
    <body>
      <div className="card">
        <h1 className="landing_header">Sign Up</h1>
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
        <input
          className="login_form"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn filled primary" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </body>
  );
}
