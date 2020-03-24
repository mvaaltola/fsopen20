import React, { useEffect } from 'react';

const Notify = ({msg, setMsg}) => {

  useEffect(() => {
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }, [msg, setMsg])

  const msgStyle = {
    color: 'green',
    background: 'lightgray',
    border: '2px solid green'
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