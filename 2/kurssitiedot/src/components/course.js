import React from 'react'
import Header from './header'
import Content from './content'

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content course={course} />
  </div>
)

export default Course