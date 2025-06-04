
import React, { useContext } from 'react';
import StudentContext from './StudentContext';

const StudentInfo = () => {
  const { name, age, email } = useContext(StudentContext);

  return (
    <div>
      <p><h1>Name:</h1>{name}</p>
      <p><h1>Age:</h1> {age}</p>
      <p><h1>Email:</h1> {email}</p>
    </div>
  );
};

export default StudentInfo;
