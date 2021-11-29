import React from "react";

const Country = ({country}) => {
    if(country === null) {
        return null
    }
    return (
        <div>
        <h1> {country.name}</h1>
        <p> capital {country.capital} </p> 
        <p> population {country.population} </p>
        <h2> languages </h2>
        <ul>
             {country.languages.map(language => (
              <li key={language.name}> {language.name} </li>
            ))}
        </ul>
        <img src={country.flag} alt='Country flag' width='200' height='150' />
    </div> 
    )
}

export default Country