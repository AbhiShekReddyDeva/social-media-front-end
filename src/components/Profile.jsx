import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import '../css/Profile.css'; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    profilePictureUrl: '',
    user: {
      id: null,
      username: '',
      email: ''
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(profileData.bio);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint to fetch profile details
    axios.get('/api/profile')
      .then(response => {
        setProfileData(response.data);
        setNewBio(response.data.bio);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const saveChanges = () => {
    const formData = new FormData();
    formData.append('bio', newBio);
    if (newProfilePicture) {
      formData.append('profilePicture', newProfilePicture);
    }
    axios.post('/api/profile/update', formData)
      .then(response => {
        setProfileData(response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error saving profile data:', error);
      });
  };

  return (
    <Container maxWidth="md" className="profile-container">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <div className="profile-picture">
          <Avatar 
            alt={`${profileData.firstName} ${profileData.lastName}`}
            src={profileData.profilePictureUrl}
            sx={{ width: 190, height: 190, margin: '0 auto' }}
          />
          {editMode && (
            <div>
              <input
                accept="image/*"
                type="file"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
                id="profile-picture-input"
              />
              <label htmlFor="profile-picture-input">
                <Button variant="contained" component="span" color="primary" sx={{ mt: 1 }}>
                  Choose File
                </Button>
              </label>
            </div>
          )}
        </div>
        <IconButton onClick={() => setEditMode(!editMode)}>
          {editMode ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        {editMode ? (
          <div>
            <TextField
              label="Bio"
              multiline
              rows={4}
              value={newBio}
              onChange={handleBioChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Typography variant="body1" gutterBottom>
            {profileData.bio}
          </Typography>
        )}
        <Typography variant="h4" gutterBottom>
          {profileData.firstName} {profileData.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Username: {profileData.user.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {profileData.user.email}
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
