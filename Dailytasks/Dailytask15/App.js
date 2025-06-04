// App.jsx
import React from 'react';
import StudentProvider from './StudentProvider';
import StudentInfo from './StudentInfo';

function App() {
  return (
    <StudentProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Student Details</h1>
        <StudentInfo />
      </div>
    </StudentProvider>
  );
}

export default App;
