import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';
import '../../css/home.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.info('Odjavljen si.');
    navigate('/login');
  };

  return (
    <button className="sidebar-button-logout" onClick={handleLogout}>
      <FaSignOutAlt className="icon" /> Odjava
    </button>
  );
};

export default LogoutButton;
