import React, { useState, useEffect } from "react";
import countryService from './services/countries'
import Countries from "./components/Countries";
import Country from "./components/Country";


const App = () => {
  const [countries, setCountries ] = useState([])
  const [ showall, setShowAll ] = useState('')
  const [ showCountry, setShowCountry ] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(resp => {
        setCountries(resp.data)
      })
  }, [])

  const handleShowAll = (event) => {
    console.log(event.target.value)
    setShowCountry(null)
    setShowAll(event.target.value)

  }
  const handleShowCountry = ((country) => {
    setShowCountry(country)
  }) 

  
  return (
    <div>
      find countries <input value={showall} onChange={handleShowAll} />
      <Countries countries={countries} filter={showall} buttonClick={handleShowCountry} />
      <Country country={showCountry} />
  </div>
  )
}

export default App;
 
