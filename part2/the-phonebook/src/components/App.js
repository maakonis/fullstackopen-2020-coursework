import React, { useState } from 'react';
import axios from 'axios'
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'

function App() {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm] = useState('')

  React.useEffect(() => {
    console.log('sideffect start')
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  const changeName = (e) => setNewName(e.target.value)
  const changeNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setFilterTerm(e.target.value.toLowerCase())

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterTerm))
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newEntry = persons.map(person => person.name).indexOf(newName)
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
