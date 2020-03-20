import React from 'react'
import Header from './header'
import Content from './content'
import Total from './total'

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content course={course} />
    <Total parts={course.parts}/>
  </div>
)

export default Course