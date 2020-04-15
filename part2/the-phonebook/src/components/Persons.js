import React from 'react';
import phoneService from '../services/phoneService'

function Persons({ persons, setPersons }) {

    const handleDelete = (event) => {
        const personName = event.target.value
        const personId = persons.find(person => person.name === personName).id
        if (window.confirm(`Delete ${event.target.value}?`)) {
            phoneService.remove(personId)
                .then(() => {
                    return setPersons(persons
                        .filter(person => person.id !== personId))
                })
                .catch(error => console.log('Entry not in db - already deleted or did not exist', error))

        }
    }

    return (
        <div>
            {persons.map(person => {
                return (<div key={person.name}>
                    <span>{person.name} {person.number} </span>
                    <button value={person.name} onClick={handleDelete}>delete</button>
                </div>
                )
            })}
        </div>
    );
}

export default Persons;