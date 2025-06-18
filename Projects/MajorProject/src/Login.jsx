import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Login = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/music-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />

      {/* Login Form */}
      <div className="relative z-20 bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-500">
            Sign in
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <button onClick={switchToRegister} className="text-indigo-400 underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
