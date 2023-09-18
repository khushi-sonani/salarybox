import React from 'react'
import ReactDOM  from 'react-dom';
import TextField from '@mui/material/TextField';

function Front() {
  return (
    <div>
    <TextField id="name" label="Standard" variant="standard" />
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </div>
  )
}

export default Front
