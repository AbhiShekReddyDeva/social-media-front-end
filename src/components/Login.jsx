import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from "react-redux";
import { loginStudent } from '../slice/LoginSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.login);
  const [errorMessage,setErrorMessage] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStudent(formData))
    console.log(formData);
  };

  const handleCreateAccountClick = () => {
   navigate("/register");
  };

  useEffect(()=>{
    if(status === "success"){
      navigate("/user/home");
    }
    if(error){
        setErrorMessage(error.response.data.message)
    }
  },[status,error,navigate])

  return (
    <Box className="login-container">
      <Box className="login-box">
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form className="login-form" onSubmit={handleSubmit}>
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
          {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Box className="create-account-btn">
          <Button color="primary" onClick={handleCreateAccountClick}>
            Create New Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
