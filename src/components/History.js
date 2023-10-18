import  React ,{useState,useRef}from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Textarea from '@mui/joy/Textarea';
import Cookies from 'js-cookie';
import {Button,Dialog, DialogTitle,DialogContent,DialogActions,} from '@mui/material';

import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileOpen = () => {
    if (selectedFile) {
    
      console.log("Opening file:", selectedFile.name);
    } else {
      console.log("No file selected.");
    }
  };
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function History() {

  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const [age, setAge] = React.useState('');

  const currencies = [
    {
      value: 'Casual Leave',
      label: 'Casual Leave',
    },
    {
      value: 'Privileged leave',
      label: 'Privileged leave',
    },
    {
      value: 'Sick Leave',
      label: 'Sick Leave',
    },
    {
      value: 'Unpaid Leave',
      label: 'Unpaid Leave',
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const handleButtonClick = () => {
    // Trigger the click event of the file input when the button is clicked
    fileInputRef.current.click();
  };
  const handleChooseFromGalleryClick = () => {
    // Trigger the click event of the file input without capture
    secondFileInputRef.current.click();
  };
  const secondFileInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [leavetype, setLeavetype] = useState('c');
  const [reasonofleave, setReasonofleave] = useState('');
  
 const handleRequestLeave = async (e) => {
  e.preventDefault();

  try {
    // Get the empid from the cookie
    const empid = Cookies.get('empid');

    // Create a new Date object for fromDate and toDate
    const formattedFromDate = new Date(fromDate);
    const formattedToDate = new Date(toDate);

    // Format the dates to "YYYY-MM-DD"
    formattedFromDate.setHours(0, 0, 0, 0); // Set time to midnight
    formattedToDate.setHours(0, 0, 0, 0);

    const requestData = {
      fromdate: formattedFromDate.toISOString().split('T')[0], // Format fromDate
      todate: formattedToDate.toISOString().split('T')[0], // Format toDate
      leavetype: leavetype, // Pass the selected leavetype
      reasonofleave: reasonofleave, // Pass the selected reasonofleave
      empid: empid, // Pass the empid from the cookie
    };
    console.log('Request Data:', requestData);

    // Define the API URL
    const apiUrl = 'https://attendance-backend-five.vercel.app/leave/requestleave'; // Replace with the actual URL of your backend API

    // Make the POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Leave request created:', data.leaveRequest);

    alert('Leave request created successfully');

    // Handle the successful response, if needed
    console.log('Leave request created:', data.leaveRequest);
  } catch (error) {
    // Handle errors, if any
    console.error('Error creating leave request:', error);
    alert('Error creating leave request. Please try again.' + error);
  }
};

  
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: '100%', // Increased width for the container
        margin: '0 auto', // Center horizontally
        position: 'relative',
        minHeight: 100, // Reduced heigh
        
      }}
    >
      <AppBar position="static" color="default" style={{ backgroundColor: '#424242', color:'white' }}>
      <Toolbar>
      <button style={{ backgroundColor:'#424242' , border:'none' , color:'white'}}>
            <a href='userdash'  >
        <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{ color: 'white' }}
          >
            <ArrowBackIcon />
          </IconButton>
          </a>
          </button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Khushi Sonani
          </Typography>
          
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="white"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Request" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <h3   style={{marginLeft:'1%', marginTop:'0%'}}>Leave Balance</h3>
            
        <div
    style={{
      display: 'flex',
      marginBottom: '10px', 
      justifyContent: 'center'// Add margin-bottom to create space between the boxes and calendar
    }}
  >
    <Box
  color="black"
  marginLeft="10%"
  bgcolor="#e8f5e9"
  borderLeft="4px solid darkgreen"
  height="40px"
  width="80px"
  p={1}
  style={{
    marginRight: '10px',
    marginLeft: '1px',
    fontSize: '12px',
    textAlign: 'center',
    whiteSpace: 'nowrap', // Prevent text from wrapping
  }}
>
  Privileged leave<br />
  <div>
    <b style={{ fontSize: '20px' }}>0</b>
  </div>
</Box>

    <Box

      color="black"
      marginLeft="10%"
      bgcolor="#e8f5e9"
      borderLeft="4px solid darkgreen"
      height="40px"
      width="80px"
      p={1}
      style={{ marginRight: '10px',marginLeft:'1px', fontSize: '12px', textAlign: 'center' }}
    >
      Sick leave<br />
      <b style={{ fontSize: '20px' }}>0</b>
    </Box>
    <Box

color="black"
marginLeft="10%"
bgcolor="#e8f5e9"
borderLeft="4px solid darkgreen"
height="40px"
width="80px"
p={1}
style={{ marginRight: '10px',marginLeft:'1px', fontSize: '12px', textAlign: 'center' }}
>
      Casual leave<br />
      <b style={{ fontSize: '20px' }}>0</b>
    </Box>
    
  </div>
  <div style={{ marginTop: '20px', marginLeft: '1%', display: 'flex', alignItems: 'center' }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ marginRight: '10px' }}>
      <DatePicker label="From Date"  value={fromDate}
        onChange={(date) => setFromDate(date)}/>
    </div>
    <div>
      <DatePicker label="To Date"  value={toDate}
        onChange={(date) => setToDate(date)} />
    </div>
  </LocalizationProvider>
</div>
<div style={{ marginTop: '10px' , marginLeft:'1%'}}>
  <FormGroup>
      
      <FormControlLabel control={<Checkbox />} label="Requst leave for half day" size="medium"/>
     
    </FormGroup>
    </div>
    <Box sx={{ minWidth: 120 }}>
    <div style={{ marginTop: '10px', marginLeft:'1%' }}>
    <TextField
          id="outlined-select-currency"
          select
          label="Select Leave"
          defaultValue="Casual Leave"
          value={leavetype}
          onChange={(e) => setLeavetype(e.target.value)}
          sx={{ minWidth: 310 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div style={{ marginTop: '10px', marginLeft:'1%', marginBottom:'1px' }}>
        
        <Textarea placeholder="Reason of leave (Optional)"value={reasonofleave}
  onChange={(e) => setReasonofleave(e.target.value)}  minRows={2}/>
        <p  style={{ fontSize:'20px', color:'black', marginTop:'5px'}}><b>Add Image</b></p>
          <Button style={{marginTop:'0%', color:'black' , border:'solid black',height:'50px', width:'10px', fontSize:'10px'}} onClick={openPopup}>ADD<br/> FILE</Button>
          <Dialog open={isOpen} onClose={closePopup}>
        <DialogTitle>Update Document</DialogTitle>
        <DialogContent>
        
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none', fontSize:'15px'}}onClick={handleButtonClick}  >
            Take a picture
           
          </Button>
          <input
        type="file"
        accept="image/*"
        capture="camera"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
      />
        
     <br/>
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none',fontSize:'15px'}} onClick={handleChooseFromGalleryClick} >
            Choose from gallery
          </Button>
          <input
        type="file"
        accept="image/*"
        ref={secondFileInputRef}
        style={{ display: 'none' }} // Hide the file input
      />
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none', fontSize:'15px'}} onClick={handleChooseFromGalleryClick}>
            Choose document
          </Button>
          <input
        type="file"
        accept="image/*"
        ref={secondFileInputRef}
        style={{ display: 'none' }} // Hide the file input
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Cancel</Button>
        </DialogActions>
      </Dialog>
          </div>
       
          <Button style={{marginTop:'17%', color:'white' ,height:'50px', width:'100%', fontSize:'20px', backgroundColor:'#4f5cd7'}}   onClick={handleRequestLeave}>Request Leave</Button>
        
        
    </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div
    style={{
      margin:'1px',
      marginRight:'5px',
      marginBottom: '10px', 
      justifyContent: 'center'// Add margin-bottom to create space between the boxes and calendar
    }}
  >
 <Box
  color="black"
  marginLeft="1%"
  marginTop="10px"
  bgcolor="white"
  borderRadius="3px"
  boxShadow="1px 3px 3px 1px #bdbdbd"
  height="220px"
  width="100%"
  p={1}
  display="flex"
  alignItems="center"
>
<div style={{ paddingTop:'10px'}}>
  <h4 style={{  marginTop:'10px',  marginRight: '100px' , display:"inline"}}>khushi sonani</h4>
  <p style={{ fontSize:'10px', display:'inline', color:'black', marginBottom:'50px', paddingTop:'10px'}}>Applied on 28 jul 2023</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>leave Date</p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline' ,paddingLeft:'47px'}}>21 jul - 21 jul 2023</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>Duration </p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline', paddingLeft:'53px' }}>1 days (Casual Leave)</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>Leave Balance</p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline', paddingLeft:'22px' }}>-1 day(s)</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline', paddingBottom:'100px' }}>Reason  </p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline' ,paddingBottom:'100px', paddingLeft:'60px', textAlign: "center", verticalAlign:'bottom'}}>i will like you to infrom that,  i will be  leave on monday 21-070-2023 due to some famliy reason. so please  accept it.  </p>

</div>
  

</Box>
<Box
  color="black"
  marginLeft="1%"
  marginTop="10px"
  bgcolor="white"
  borderRadius="3px"
  boxShadow="1px 3px 3px 1px #bdbdbd"
  height="220px"
  width="100%"
  p={1}
  display="flex"
  alignItems="center"
>
<div style={{ paddingTop:'10px'}}>
  <h4 style={{  marginTop:'10px',  marginRight: '100px' , display:"inline"}}>khushi sonani</h4>
  <p style={{ fontSize:'10px', display:'inline', color:'black', marginBottom:'50px', paddingTop:'10px'}}>Applied on 28 jul 2023</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>leave Date</p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline' ,paddingLeft:'47px'}}>21 jul - 21 jul 2023</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>Duration </p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline', paddingLeft:'53px' }}>1 days (Casual Leave)</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline' }}>Leave Balance</p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline', paddingLeft:'22px' }}>-1 day(s)</p><br/>
  <p style={{ color:'#757575', fontSize:'12px', marginRight: '20px', display: 'inline', paddingBottom:'100px' }}>Reason  </p>
  <p style={{ color:'black', fontSize:'12px', display: 'inline' ,paddingBottom:'100px', paddingLeft:'60px', textAlign: "center", verticalAlign:'bottom'}}>i will like you to infrom that,  i will be  leave on monday 21-070-2023 due to some famliy reason. so please  accept it.  </p>

</div>
  

</Box></div> 
        </TabPanel>
        
      </SwipeableViews>
     
    
    </Box>
  );
}