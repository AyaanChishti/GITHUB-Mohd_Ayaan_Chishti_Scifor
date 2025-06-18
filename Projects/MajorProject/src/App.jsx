import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MusicPlayer from './MusicPlayer';

function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center text-3xl font-bold py-4 shadow-lg">
        Rhythmix 🎧
      </div>

      {page === 'login' && (
        <Login
          onLogin={() => setPage('player')}
          switchToRegister={() => setPage('register')}
        />
      )}
      {page === 'register' && (
        <Register
          onRegister={() => setPage('player')}
          switchToLogin={() => setPage('login')}
        />
      )}
      {page === 'player' && <MusicPlayer />}
    </>
  );
}

export default App;
