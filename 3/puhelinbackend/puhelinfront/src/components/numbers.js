import React from 'react';

const Numbers = ({persons, filteredPersons, delButton}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>)}
        <h1>Filtered persons</h1>
        {filteredPersons.map(person =>
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={delButton(person.id)}>delete</button>
          </p>)}
      </div>
    </div>
  );
};

export default Numbers;