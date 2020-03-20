import React from 'react';

const Total = ({parts}) => {
  const exercises = parts.map(part => {
    return part.exercises
  }).reduce((a, b) => a + b, 0)
  return (
    <div>
      total of {exercises} exercises
    </div>
  );
};

export default Total;