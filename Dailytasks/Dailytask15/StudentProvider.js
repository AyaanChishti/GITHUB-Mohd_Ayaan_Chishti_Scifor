
import React from 'react';
import StudentContext from './StudentContext';

const StudentProvider = ({ children }) => {
  const student = {
    name: 'Ayaan Chishti',
    age: 23,
    email: 'ayaanchishti444@gmail.com',
  };

  return (
    <StudentContext.Provider value={student}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
