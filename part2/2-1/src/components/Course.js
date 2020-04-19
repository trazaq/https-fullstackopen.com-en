import React from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Part = ({name, exercise}) => <p>{name} {exercise}</p>

const Content = ({part}) => <Part name={part.name} exercise={part.exercises} />

const Course = ({ course }) =>
{
    const totalExercsises = () => course.parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
        <div>
            <Header header={course.name} />
            {course.parts.map(part => <Content key={part.id} part={part} />)}
            <p><strong>Total of {totalExercsises()} Exercises</strong></p>
        </div>
    )
}

export default Course
  