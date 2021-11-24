import React from 'react'
import Person from './Person'

const Persons = ({ persons , pfilter, deletePerson}) => {
  return (

      persons
      .filter(person => person.name.toLowerCase().includes(pfilter.toLowerCase()))
      .map(person => <Person 
        key={person.id}
        name={person.name}
        number={person.number}
        deletePerson={()=> deletePerson(person)} 
          
      /> )
  
  )
}

export default Persons
