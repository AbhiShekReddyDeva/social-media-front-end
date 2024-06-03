import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SocialMediaApp</Link>
      </div>
      <div className="navbar-links">
        {!isAuthenticated ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
