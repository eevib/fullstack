import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

// const Total = ({ course }) => {
//   let sum = 0
//   sum = course.parts.map(part => part.exercises.sum)
//   console.log(sum)
//   return(
//     <p>Number of exercises {sum}</p>
//   ) 
// }

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
      {/* <Total course={course} /> */}
    </div>
  )
}

export default Course