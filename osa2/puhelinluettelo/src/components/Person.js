import React from 'react'

const Person = ({ persons , pfilter}) => {
  return (
      persons
      .filter(person => person.name.toLowerCase().includes(pfilter.toLowerCase()))
      .map(person => <li key={person.name}> {person.name} {person.number} </li>)
    
  )
}

export default Person
