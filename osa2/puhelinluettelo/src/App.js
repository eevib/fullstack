import React, { useState } from 'react'
import Person from './components/Person'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')


  const addName = (event) => {
    event.preventDefault()
      const nameObject= {
        name: newName,
        number: newNumber,
      }
      persons.find(person => person.name === newName)
        ? alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(nameObject))

      setNewNumber('')
      setNewName('')
    }    

  
    
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleShowAll = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
     <div><PersonFilter filter={showAll} onChange={handleShowAll} />
     </div>
         <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
      <Person persons={persons} pfilter={showAll}/> 
      </div>
    </div> 
  )

}

export default App