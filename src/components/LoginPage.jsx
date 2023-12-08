import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../services/firebase';

export default function LoginScreen({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login with Firebase and error handling
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        history.push('/TabNavigation'); // Assuming you have a route named '/TabNavigation'
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          alert('E-mail or password is incorrect');
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  // Navigate to SignupScreen in the stack
  const handleSignup = () => {
    history.push('/Signup'); // Assuming you have a route named '/Signup'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>Your App Title</h1>
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
      <button onClick={handleLogin}>Login</button>
      <div>
        <p>Don't have an account? <span style={{ color: '#007BFF', cursor: 'pointer' }} onClick={handleSignup}>Sign up</span></p>
      </div>
    </div>
  );
}