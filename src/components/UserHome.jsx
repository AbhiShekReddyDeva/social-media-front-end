import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/UserHome.css";

const UserHome = () => {
  const userMenu = [
    { name: "Profile", path: "profile" },
    {name: "Messages", path: "messages"},
    {name: "Friends" , path: "friends"},
    { name: "Notifications", path: "notifications" },
    {name: "Settings", path: "settings"},
    { name: "Logout", path: "logout" },
  ];


  const renderMenu = (menu) => (
    <ul>
      {menu.map((item, index) => (
        <li key={index}>
          <Link to={item.path} style={{textDecoration : "none"}} >{item.name}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="home-container">
      <nav className="sidebar">
        {
            renderMenu(userMenu)
        }
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserHome;
