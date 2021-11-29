import React from "react";
import Country from "./Country";

const Countries = ({ countries, filter, buttonClick }) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if(filteredCountries.length > 10) {
      return <p> Too  many matches, specify another filter </p>
    
    } else if(filteredCountries.length === 1) {
           console.log(filteredCountries[0])
            return (
            <Country country ={filteredCountries[0]} />
            )
    } else {
        return (
             <ul>
               {filteredCountries.map(c => (
                <li key={c.name}>
                {c.name} <button onClick={()=> buttonClick(c)}>show</button>
                </li>
                ))}
            </ul>
            )
        }
}

export default Countries
