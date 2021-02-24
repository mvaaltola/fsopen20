import React, { useEffect } from 'react';

const Notify = ({msg, setMsg, success}) => {

  useEffect(() => {
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }, [msg, setMsg])

  let color = 'green';
  if (!success) { color = 'red' }
  const msgStyle = {
    color: color,
    background: 'lightgray',
    border: `2px solid ${color}`
  }

  if (msg === null) {
    return null
  } else { return (
    <div style={msgStyle}>
      {`${msg}`}
    </div>
  )}
}

export default Notify;
