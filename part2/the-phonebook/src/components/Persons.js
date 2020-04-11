import React from 'react';

function Persons({persons}) {
    return (
        <div>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    );
}

export default Persons;