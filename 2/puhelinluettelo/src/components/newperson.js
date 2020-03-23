import React from 'react'

const Newperson = ({addName, newName, handleNameChange, newNr, handleNrChange}) => {
  return (
    <form onSubmit ={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input value={newNr} onChange={handleNrChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Newperson