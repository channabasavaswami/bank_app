import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import LoanDetails from './components/LoanDetails';
import CreateLoanUser from './components/CreateLoanUser';
import GenerateReports from './components/GenerateReports';
import ViewApplications from './components/ViewApplications';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userName, setUserName] = useState('DEVARAJ');

  // MetaMask detection and error handling
  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // MetaMask is installed, but we don't need it for this app
      // This prevents the connection error
      console.log('MetaMask detected but not required for this application');
    }
    
    // Override any MetaMask connection attempts to prevent errors
    if (window.ethereum && window.ethereum.request) {
      const originalRequest = window.ethereum.request;
      window.ethereum.request = async (args) => {
        // If it's a connection request, return a mock response
        if (args.method === 'eth_requestAccounts' || args.method === 'eth_accounts') {
          console.log('MetaMask connection request intercepted - not required for this app');
          return [];
        }
        // For other requests, call the original method
        return originalRequest.call(window.ethereum, args);
      };
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUserName(username || 'DEVARAJ');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'services':
        return <Services onBack={() => handleNavigation('dashboard')} />;
      case 'loan-details':
        return <LoanDetails onBack={() => handleNavigation('dashboard')} />;
      case 'create-loan':
        return <CreateLoanUser onBack={() => handleNavigation('dashboard')} />;
      case 'reports':
        return <GenerateReports onBack={() => handleNavigation('dashboard')} />;
      case 'view-applications':
        return <ViewApplications onBack={() => handleNavigation('dashboard')} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <NavBar onLogout={handleLogout} userName={userName} />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
