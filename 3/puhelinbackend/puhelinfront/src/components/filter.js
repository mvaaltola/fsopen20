import React from 'react';

const Filter = ({searchName, handleSearchNameChange}) => {
  return (
    <div>
      <p>filter shown with <input
        value={searchName}
        onChange={handleSearchNameChange} /></p>
    </div>
  );
};

export default Filter;