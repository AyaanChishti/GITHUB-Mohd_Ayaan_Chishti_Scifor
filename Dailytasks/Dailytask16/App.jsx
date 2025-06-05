import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '1',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    alert(`Feedback Submitted!\n\nName: ${formData.name}\nEmail: ${formData.email}\nRating: ${formData.rating}`);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Server Response:', result);
      setStatus('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to submit feedback.');
    }
  };

  return (
    <div className="form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Feedback Rating (1 to 5):</label>
        <select name="rating" value={formData.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
        <p>{status}</p>
      </form>
    </div>
  );
}

export default App;
