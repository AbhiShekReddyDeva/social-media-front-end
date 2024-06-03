import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Register from './components/Register';
import UserHome from './components/UserHome';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/home' element={<UserHome />}>
          <Route path='profile' element={<Profile />} />
          <Route path='notifications' element={<h1>Notifications</h1>} />
          <Route path='friends' element={<h1>Friends</h1>} />
          <Route path='messages' element={<h1>Messages</h1>} />
          <Route path='settings' element={<h1>Settings</h1>} />
          <Route path='logout' element={<h1>Logout</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
