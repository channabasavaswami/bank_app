import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ onLogout, userName = 'DEVARAJ' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeDropdown();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on top left */}
        <div className="navbar-logo">
          <img 
            src="/logo192.png" 
            alt="Vaibhavanidhi Logo" 
            className="logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="logo-fallback">🏦</div>
        </div>

        {/* Center - Vaibhavanidhi name */}
        <div className="navbar-center">
          <h1 className="bank-name">VAIBHAVANIDHI</h1>
          <p className="bank-subtitle">Cooperative Bank Limited</p>
        </div>

        {/* Dropdown on top right */}
        <div className="navbar-right">
          <div className="user-dropdown-container">
            <button 
              className="user-dropdown-toggle"
              onClick={toggleDropdown}
              onBlur={() => setTimeout(closeDropdown, 150)}
            >
              <span className="user-greeting">Hello {userName}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  Profile
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">⚙️</span>
                  Settings
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">🔔</span>
                  Notifications
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 