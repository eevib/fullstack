import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  let sum = course.parts.reduce(
    ( ac, parts ) => ac + parts.exercises,
    0
  )
  return(
    <p><b>Total of exercises {sum}</b></p>
  ) 
}

const Part = ({ part }) => {
  console.log()
  return (
    <p>
       {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
          )}
    </div>
  )
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course