import React, { useRef,useState,  useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import {Dialog, DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

function Document() {
  const [adddocument, setAddDocument] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const openSecondPopup = () => {
    setIsSecondPopupOpen(true);
  };

  const closeSecondPopup = () => {
    setIsSecondPopupOpen(false);
  };
  const currencies = [
    {
      value: 'a',
      label: 'Adhar',
    },
    {
      value: 'b',
      label: 'Adress Proof',
    },
    {
      value: 'c',
      label: 'Background Verification ',
    },
    {
      value: 'd',
      label: 'Bank Account Details',
    },
    {
      value: 'e',
      label: 'Degree',
    },
    {
      value: 'e',
      label: 'Driving License',
    },
    {
      value: 'f',
      label: 'Employee Contract ',
    },
    {
      value: 'g',
      label: 'PAN Card',
    },
    {
      value: 'h',
      label: 'Police Verification',
    },
    {
      value: 'i',
      label: 'Salary ship ',
    },
    {
      value: 'j',
      label: 'Previous Employee Documnents',
    },
    {
      value: 'k',
      label: 'Professional Documnet',
    },
    {
      value: 'l',
      label: 'Other',
    },
  ];
  
  const handleButtonClick = () => {
    // Trigger the click event of the file input when the button is clicked
    fileInputRef.current.click();
  };
  const handleChooseFromGalleryClick = () => {
    // Trigger the click event of the file input without capture
    secondFileInputRef.current.click();
  };


  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const secondFileInputRef = useRef(null);
  const fileInputRef = useRef(null);


  const handleCreateDocument = () => {
    // Assuming you have the document type in 'adddocument'
    if (!adddocument) {
      alert('Please select a document type before creating the document.');
      return;
    }

    if (!selectedFile) {
      alert('Please select a file before creating the document.');
      return;
    }

    const formData = new FormData();
    formData.append('adddocument', adddocument);
    formData.append('file', selectedFile);

    // Replace with your API endpoint
    const apiUrl = 'https://attendance-backend-five.vercel.app/document/documents';

    fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('New document created:', data);
        alert('Document created successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error creating document. Please try again.');
      });
  };

  const handleChooseDocument = () => {
    fileInputRef.current.click();
  };
  const [userData, setUserData] = useState([]);

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const mobileNo = Cookies.get('mobileNo'); // Get the mobile number from the cookie
      if (!mobileNo) {
        throw new Error('Mobile number not found in cookie.');
      }
      const authToken = Cookies.get('authToken'); // Get the authentication token from the cookie

      // Make a request to your backend API to fetch user data based on the mobile number
      const response = await fetch(`https://attendance-backend-five.vercel.app/search/${mobileNo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Include the authentication token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  
  return (
    <div >
        <Box sx={{ flexGrow: 1, width: 380, backgroundColor: 'black' }}>
      <AppBar position="static" style={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <a href='userdash' style={{ backgroundColor: '#424242', border: 'none', color: 'white', textDecoration: 'none' }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>
              {userData.length !== 0 ? (
                <div>
                  <p className='color'>{userData[0].name }'s Documnents</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Button
        variant="contained"
        style={{
          marginLeft: '180px',
          height: '50px',
          marginTop: '500px',
          backgroundColor: '#4f5cd7',
          border: '0px',
          borderRadius: '30px',
        }}
        startIcon={<AddIcon />}
        onClick={openPopup} 
      >
        Add Document
      </Button>
      
      <Dialog open={isOpen} onClose={closePopup} sx={{ width: '380px',  left: '50%', transform: 'translateX(-50%)' }}>
        <DialogTitle>Please select document type</DialogTitle>
        <DialogContent sx={{ marginTop: '20px' }}>
        
        <TextField
          id="outlined-select-currency"
          select
      
          defaultValue="a"
          sx={{ minWidth: 265 , position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999  }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField><br/>
        <Button variant="contained"
        style={{
          marginLeft: '0px',
          height: '50px',
          width:'265px',
          marginTop: '40px',
          backgroundColor: '#4f5cd7',
          border: '10px',
          borderRadius: '5px',
        }}  onClick={openSecondPopup}>Next </Button>
 
          
        
     <br/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} style={{ marginRight:'115px'}}>Close </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isSecondPopupOpen}
        onClose={closeSecondPopup}
        sx={{
          width: '380px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <DialogTitle>Update File</DialogTitle>
        <DialogContent sx={{ marginTop: '20px' }}>
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
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none',fontSize:'15px'}}onClick={handleChooseFromGalleryClick}>
            Choose from gallery
          </Button>
          <input
          type="file"
          accept="image/*"
          ref={secondFileInputRef}
          style={{ display: 'none' }}
        />
          <Button variant="outlined" style={{marginTop:'5px', color:'black' , border:'none', fontSize:'15px'}}onClick={handleChooseFromGalleryClick} >
            Choose document
          </Button>
          <input
          type="file"
          accept="image/*"
          ref={secondFileInputRef}
          style={{ display: 'none' }}
        />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSecondPopup}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
     
  
  );
}

export default Document;
