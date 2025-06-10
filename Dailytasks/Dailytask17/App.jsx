import { useState } from 'react';

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

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Delete Post Example</h1>
      <button onClick={handleDelete} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Delete Post ID 1
      </button>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default App;
