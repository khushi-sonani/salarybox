import React, { useState,useRef  } from 'react';
import axios from 'axios';
import khushi from "./img/khushi.jpeg";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from '@mui/material';
import './profile.css';
const Profile = () => {
 // const [postData, setPostData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(khushi);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const [open, setOpen] = useState(false);
  const handleImageChange = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        setProfileImage(reader.result);
        const base64Image = reader.result.split(',')[1];
        console.log('Image data to be sent:', base64Image);
        try {
          const response = await axios.post('http://localhost:5000/image', {
            base64Image,
          });
          const dataURL = `data:image/jpeg;base64,${base64Image}`;
          console.log('Image Data URL:', dataURL);
          if (response.status === 200) {
            console.log('Image uploaded successfully');
            setOpen(false);
          } else {
            console.error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleProfileImageClick = () => {
    setShowProfileImage(!showProfileImage);
  };
   
  return (
    <div className='main'>
      <div className='sub-main'>
        <div>
          <div className='imgs'>
            <div className='container-img'>
              <img
                src={profileImage}
                alt='logo'
                className={`logo ${showProfileImage ? 'enlarged' : ''}`}
                onClick={handleProfileImageClick}
              />
              <h3>khuhsi sonnai</h3>
              <h4>+91 8866738658</h4>
            </div>
          </div>
          <Popup
            contentStyle={{ width: '300px', left: '40%' }}
            trigger={
              <Button variant="contained" size="large">
                Edit profile
              </Button>
            }
            position="bottom center"
          >
            <div style={{ width: '300px', textAlign: 'center' }}>
              <h4>Do you want to change your profile image?</h4>
              <p className='i'>Edit Image</p>
              <input
                type="file"
                id="fileInput"
                accept=".jpg,.png,.jpeg"
                onChange={(e) =>handleFileChange(e)}
                style={{ marginBottom: '10px' }}
              /><br />
              <Button variant="contained" size="small" onClick={handleImageChange} color="primary">Confirm</Button>
            </div>
          </Popup>
        </div>
      </div>
      {showProfileImage && (
        <div className="enlarged-image-container">
          <div className="enlarged-image">
            <img
              src={profileImage}
              alt='Enlarged profile'
              className="enlarged"
            />
          </div>
          <Button onClick={handleProfileImageClick}></Button>
        </div>
      )}
    </div>
  );
};
export default Profile;