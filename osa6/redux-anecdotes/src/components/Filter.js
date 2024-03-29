import React from 'react'
import { connect } from "react-redux"
import { filt } from '../reducers/filterReducer'


const Filter = (props) => {
  
  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.filt(filter)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToProps = {
    filt
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)