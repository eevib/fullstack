import React from "react";

const PersonFilter = ({ filter, onChange }) => {
    return ( 
    <div>   
        filter shown with <input value={filter} onChange={onChange} />
    </div> 
    )
}
export default PersonFilter 