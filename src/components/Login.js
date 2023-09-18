import react from 'react';
import ReactDOM,{ useNavigate} from 'react-router-dom';
import './Login.css'
import logo from "./img/logo.jpg"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { TextField, colors } from '@mui/material';
import {Button} from '@mui/material';
import valiation from './validation';


function FormValidation() {

  return (
<form >

    <div className='main'>
    
      <div className='sub-main'>
        <div>
          <div className='imgs'>
            <div className='container-img'>
              <img src={logo} alt='logo' className='logo' />
            </div>
          </div>
          <h1 className='h1'>Login</h1>
          <div>
          <TextField label="Name" name='name' id="outlined-size-small" size="small"/>
        
          </div >

          <div className="second-input">
        
          <TextField label="Password" name='password' id="outlined-size-small" size="small" />
         
          </div><br/>
          <div className="btn">
            <Link to="/side">
            <Button  type='Submit' style={{ backgroundColor:'#4f5cd7'}}  variant="contained" size="large" > Login</Button>
         
          </Link>
          </div><br/>
          <div>
           <a className='xyz' href="Signup">do not have any account? <b>signu up</b></a>
          </div>
          <div>
          <a href='punchin' className='p'><b>Forgot password </b></a>
          <a href='attendance' className='p'><b>attendance</b></a><br/>
          <a href='history' className='p'><b>history</b></a><br/>
          <a href='side' className='p'><b>sidebar</b></a><br/>
          <a href='document' className='p'><b>document</b></a>
          </div>
         
        </div>
      </div>
    </div>
    </form>
  );
 
  
}

export default FormValidation;