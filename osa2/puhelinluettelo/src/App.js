import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonFilter from './components/PersonFilter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
      const nameObject= {
        name: newName,
        number: newNumber,
      }
    const pers = persons.find(p => p.name === newName) 
    if(pers === undefined) {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Added '${newName}'`)
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    } else if (pers.number === newNumber) {
      alert(`'${newName}' is already added to phonebook`)
    } else if(pers.name === newName) {
      if(window.confirm(`'${newName}' is already added to phonebook, do you want to replace the old numer with a new one?`)) {
        personService
          .update(pers.id, nameObject)
          .then(response => {
            setMessage(`Updated the number of '${newName}'`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Person '${newName}' was already removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== pers.id))
          })
      } 
    }
      setNewNumber('')
      setNewName('')  
  }

  const handleDeletePerson = (person) => {
    console.log(`id: ${person.id} `)
    if(window.confirm(`Are you sure you want to delete '${person.name}'? `)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p=> p.id !== person.id))
          setMessage(`Deleted '${person.name}'`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
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
      <Message message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
      <Persons persons={persons} pfilter={showAll} deletePerson={handleDeletePerson}/> 
      </div>
    </div> 
  )

}

export default App