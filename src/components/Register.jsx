import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';
import '../css/Register.css';
import { useDispatch,useSelector } from 'react-redux';
import {register} from "../slice/RegisterSlice"
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.register);
  const [errorMessage,setErrorMessage] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    console.log(formData);
  };

  useEffect(()=>{
    if(status === 'Successful'){
      navigate('/');
    }
    if(error){
      setErrorMessage(error);
    }
  },[status,error,navigate])

  return (
    <Container maxWidth="sm" className="registration-form-container">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{color:"blue"}}>
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
