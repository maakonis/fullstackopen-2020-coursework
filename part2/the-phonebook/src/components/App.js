import React, { useState } from 'react';
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'

function App() {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '07456-290-2777' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm] = useState('')
  
  const changeName = (e) => setNewName(e.target.value)
  const changeNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilterTerm(e.target.value.toLowerCase())

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterTerm))
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = persons.map(person => person.name).indexOf(newName)
    console.log('newEntry', newEntry)
    if (newEntry === -1) {
      const newPerson = [{ 
        name: newName,
        number: newNumber
      }];
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterTerm} handleFilter={handleFilter} />
      <Form onSubmit={handleSubmit} 
        name={newName}
        changeName={changeName} 
        number={newNumber}
        changeNumber={changeNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;
