import React, { useState } from 'react';
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'
import phoneService from '../services/phoneService'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  React.useEffect(() => {
    phoneService.getAll()
      .then(allNotes => setPersons(allNotes))
  }, [])

  const changeName = (e) => setNewName(e.target.value)
  const changeNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilterTerm(e.target.value.toLowerCase())

  const filteredPersons = persons
    .filter(person => person.name.toLowerCase()
      .includes(filterTerm))

  const handleSubmit = (e) => {
    e.preventDefault()
    const entryIndex = persons.map(person => person.name).indexOf(newName)
    if (entryIndex === -1) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phoneService.create(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons[entryIndex]
        const updateNumber = { ...existingPerson, number: newNumber }
        phoneService.update(existingPerson.id, updateNumber)
          .then(response => setPersons(persons
            .map(person => person.id !== existingPerson.id ? person : response)))
        setNewName('')
        setNewNumber('')
      }
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
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App;
