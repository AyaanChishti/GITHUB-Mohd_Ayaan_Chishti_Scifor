import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const Register = ({ onRegister, switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onRegister();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="email" className="w-full p-2 rounded bg-gray-700" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 rounded bg-gray-700" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-500">Create an account</button>
        </form>
        <p className="text-center text-sm">Already have an account? <button onClick={switchToLogin} className="text-indigo-400 underline">Sign in</button></p>
      </div>
    </div>
  );
};

export default Register;
