import React from 'react'

const Header = (course) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (part) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (content) => {
  return (
    <>
      <Part name={content.part[0].name} exercises={content.part[0].exercises} />
      <Part name={content.part[1].name} exercises={content.part[1].exercises} />
      <Part name={content.part[2].name} exercises={content.part[2].exercises} />
    </>
  )
}

const Total = (exercises) => {
  return (
    <p>
      Number of exercises {exercises.total}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let exercisesTotal = 0;
  course.parts.forEach(function(part){
    exercisesTotal+=part.exercises;
  });

  return (
    <div>
      <Header name={course.name} />
      <Content part={course.parts} exercises={course.parts} />
      <Total total={exercisesTotal} />
    </div>
  )
}

export default App;
