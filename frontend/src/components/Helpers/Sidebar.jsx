import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { FaUser, FaTachometerAlt, FaBars, FaHome, FaTimes } from 'react-icons/fa';
import '../../css/sidebar.css';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </div>
<aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
  <div className="close-icon" onClick={toggleSidebar}>
    <FaTimes />
  </div>

        <div className="sidebar-user-info">
          <FaUser className="sidebar-user-icon" />
          <div className="username">{user?.username}</div>
          <div className="role">{user?.role}</div>
        </div>
        <button className="sidebar-button" onClick={() => navigate('/home')}>
          <FaHome className="icon" /> Početna
        </button>
        {user?.role === 'Admin' && (
          <button className="sidebar-button" onClick={() => navigate('/admin')}>
            <FaTachometerAlt className="icon" /> Admin dashboard
          </button>
        )}
        <div className="logout-wrapper">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;