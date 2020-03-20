import React from 'react'
import Part from './part'

const Content = ({course}) => (
  <ul>
    {course.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </ul>
)

export default Content