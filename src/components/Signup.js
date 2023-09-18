import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import logo from './img/logo.jpg';
import './signup.css';
import styled from 'styled-components';
import { Sidebar, Menu, MenuItem, useProSidebar,SubMenu} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom"; 

import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// import React, { useState, useEffect } from "react";
function Signup() {
  const [date, setDate] = useState();
 
// Now you can send `formattedDate` to the server
const { collapseSidebar } = useProSidebar();
  console.log("date",date)
  const [navigate] = useState();
  const [formData, setFormData] = useState({
    name: " ",
    email: " ",
    password: " ",
    mobileNo: " ",
    adharnumber: " ",
    pannumber: " ",
    dob:" " ,
    gender: " ",
    address: " ",
    designation: " ",
    dojoining: " ",
    profile: " "
  });

  const [PostData, setPostData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/company',formData
        
      );

      setFormData({
        name: " ",
        email: " ",
        password: " ",
        mobileNo: " ",
        adharnumber: " ",
        pannumber: " ",
        dob: " ", 
        gender: " ",
        address: " ",
        designation: " ",
        dojoining: "",
        profile: " ",
      });

      setPostData([PostData, response.data]);
      alert("submitted");
    } catch (error) {
      console.error(error);
      alert("name is already used, please use a different name");
    }
  };

 

  return (
    <div>
     
    
      <form onSubmit={handleSubmit}>
        <div className='main'>
          <div className='sub-main'>
            <div>
              <div className='imgs'>
                <div className='container-img'>
                  <img src={logo} alt='logo' className='logo' />
                </div>
              </div>
              <h1 className='h1'>Registration</h1>
              <div>
                <TextField label="User name" name="name" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div>
                <TextField label="Mobile No" name="mobileNo" type="number" size="small" onChange={handleChange}/>
              </div><br/>
              <div>
                <TextField label="Adrress" name="address" type="text" size="small" onChange={handleChange}/> 
              </div><br/>
              <div>
              <LocalizationProvider  dateAdapter={AdapterDayjs}>
  <DemoContainer  components={['DatePicker']}>
    <div style={{ width:'300px'}}>
    <DatePicker label="date of birth"  className="small-textbox" /></div>
  </DemoContainer>
</LocalizationProvider>
              </div><br/>
              <div>
                <TextField label="E-mail" name="email" type="text" size="small" onChange={handleChange} />
              </div><br/>
              <div> 
                <TextField label="Pancard No" type="number" name="pannumber" ize="small" onChange={handleChange} /> <br />
              </div><br/>
              <div>
                <TextField label="Adhar No" name="adharnumber" size="small" onChange={handleChange} /> <br />
              </div><br/>
              <div>
                <TextField label="Gender"  name="gender" type="text" size="small" onChange={handleChange}/>
              </div><br/>
              <div>
                <TextField label="Designation"  name="designation" type="text"size="small" onChange={handleChange}/>
              </div><br/>
              <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DatePicker']}>
    <div  style={{ width:'300px', paddingLeft:'40px'}}>
    <DatePicker label="date of joining" className="small-textbox" /></div>
  </DemoContainer>
</LocalizationProvider>
              </div><br/>
              <div>
                <TextField label="Password"  name="password" type="password" size="small" onChange={handleChange}/>
              </div><br/>
              <div className="btn">
                <Button type='submit' variant="contained" size="large" style={{ backgroundColor:'#4f5cd7'}}>submit</Button>
 
              </div>
              <p className='link' style={{ cursor: "pointer", paddingBottom:'50px' }}onClick={() => navigate("/")}>
                already have an account? <b>Login</b>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
      );
}


export default Signup;
