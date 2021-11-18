import React from "react";

function PersonForm({addName, newName, handleNameChange, newNumber, handleNumberChange}) {
    return (
        <form onSubmit={addName}>
            <div> 
                name: <input 
                value={newName} onChange={handleNameChange} />  </div>
            <div> number: <input 
                value={newNumber} onChange={handleNumberChange} /> 
            </div> 
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm
