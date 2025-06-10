import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/2', {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Post deleted successfully');
      } else {
        setMessage('❌ Failed to delete post');
      }
    } catch (error) {
      setMessage('⚠️ Error: ' + error.message);
    }
  };

  useEffect(() => {
    // Reset body margin and padding for full centering
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'black',
        width: '100vw',
      }}
    >
      <h1>Delete Post Example</h1>
      <button
        onClick={handleDelete}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Delete Post ID 1
      </button>
      {message && (
        <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#333' }}>{message}</p>
      )}
    </div>
  );
}

export default App;
