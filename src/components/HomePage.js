import React, { useState } from 'react';
import './HomePage.css';
import CreateLoanUser from './CreateLoanUser';
import LoanDetails from './LoanDetails';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
    // Add search functionality here
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const handleCreateLoan = () => {
    setCurrentPage('create-loan');
  };

  const handleSearchApplications = () => {
    setCurrentPage('loan-details');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add logout functionality
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsNotificationDropdownOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  const closeDropdowns = () => {
    setIsUserDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  };

  // Render different components based on current page
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'create-loan':
        return <CreateLoanUser onBack={() => setCurrentPage('dashboard')} />;
      case 'loan-details':
        return <LoanDetails onBack={() => setCurrentPage('dashboard')} />;
      case 'loan-applications':
        return <LoanDetails onBack={() => setCurrentPage('dashboard')} />;
      case 'loans':
        return <LoanDetails onBack={() => setCurrentPage('dashboard')} />;
      case 'loans-status':
        return <LoanDetails onBack={() => setCurrentPage('dashboard')} />;
      case 'users':
        return <CreateLoanUser onBack={() => setCurrentPage('dashboard')} />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={handleCreateLoan}>
          Create Loan
        </button>
        <button className="btn btn-secondary" onClick={handleSearchApplications}>
          Search Loan Applications
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search with Aadhar Number or Voter"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="btn btn-search" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-clear" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container" onClick={closeDropdowns}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>COOP-CBL</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavigation('dashboard')}
            >
              <span className="nav-icon">🏠</span>
              Home
            </li>
            <li 
              className={`nav-item ${currentPage === 'loan-applications' ? 'active' : ''}`}
              onClick={() => handleNavigation('loan-applications')}
            >
              <span className="nav-icon">📄</span>
              Loan Applications
            </li>
            <li 
              className={`nav-item ${currentPage === 'loans' ? 'active' : ''}`}
              onClick={() => handleNavigation('loans')}
            >
              <span className="nav-icon">💰</span>
              Loans
            </li>
            <li 
              className={`nav-item ${currentPage === 'loans-status' ? 'active' : ''}`}
              onClick={() => handleNavigation('loans-status')}
            >
              <span className="nav-icon">📊</span>
              Loans Status
            </li>
            <li 
              className={`nav-item ${currentPage === 'users' ? 'active' : ''}`}
              onClick={() => handleNavigation('users')}
            >
              <span className="nav-icon">👥</span>
              Users
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="terms">T & C</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <span className="menu-icon">☰</span>
            <span className="org-name">VAIBHAV NIDHI SSSN Sindhanur</span>
          </div>
          <div className="header-right">
            <div className="notification-container">
              <span 
                className="notification-bell" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNotificationDropdown();
                }}
              >
                🔔
              </span>
              {isNotificationDropdownOpen && (
                <div className="dropdown notification-dropdown">
                  <div className="dropdown-item">
                    <strong>New Loan Application</strong>
                    <p>Application #12345 submitted</p>
                  </div>
                  <div className="dropdown-item">
                    <strong>Payment Due</strong>
                    <p>Loan #67890 payment due tomorrow</p>
                  </div>
                  <div className="dropdown-item">
                    <strong>System Update</strong>
                    <p>System maintenance scheduled</p>
                  </div>
                </div>
              )}
            </div>
            <div className="user-container">
              <span 
                className="user-greeting"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUserDropdown();
                }}
              >
                Hello DEVARAJ ▼
              </span>
              {isUserDropdownOpen && (
                <div className="dropdown user-dropdown">
                  <div className="dropdown-item" onClick={() => handleNavigation('profile')}>
                    👤 Profile
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigation('settings')}>
                    ⚙️ Settings
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    🚪 Logout
                  </div>
                </div>
              )}
            </div>
            <span className="power-icon">⚡</span>
          </div>
        </div>

        {/* Render Current Page */}
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default HomePage;