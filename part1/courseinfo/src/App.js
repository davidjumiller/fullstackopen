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
      <Part name={content.part[0]} exercises={content.exercises[0]} />
      <Part name={content.part[1]} exercises={content.exercises[1]} />
      <Part name={content.part[2]} exercises={content.exercises[2]} />
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
  const part = ['Fundamentals of React', 'Using props to pass data', 'State of a component'];
  const exercises = [10, 7, 14];

  let exercisesTotal = 0;
  exercises.forEach(function(exercise){
    exercisesTotal+=exercise;
  });

  return (
    <div>
      <Header name='Half Stack application development' />
      <Content part={part} exercises={exercises} />
      <Total total={exercisesTotal} />
    </div>
  )
}

export default App;
