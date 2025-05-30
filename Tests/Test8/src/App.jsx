// src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(false);

  const toggleMessage = () => {
    setShow(prev => !prev);
  };

  return (
    <div className="app">
      <button onClick={toggleMessage}>
        {show ? 'Hide' : 'Show'}
      </button>
      {show && <p>Welcome to React</p>}
    </div>
  );
}

export default App;
