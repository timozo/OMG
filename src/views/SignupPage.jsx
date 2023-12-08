import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth } from '../services/firebase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle sign up with Firebase and error handling
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('User:', user);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('The e-mail address is already in use');
        } else if (error.code === 'auth/invalid-email') {
          alert('The e-mail address is not formatted correctly');
        } else if (password !== confirmPassword) {
          alert("Passwords don't match");
        } else if (error.code === 'auth/weak-password') {
          alert('The password is too weak');
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>Sign Up</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ height: '50px', width: '250px', marginBottom: '20px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ height: '50px', width: '250px', marginBottom: '20px' }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ height: '50px', width: '250px', marginBottom: '20px' }}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}