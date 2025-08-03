import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create array of valid users
  const validUsers = [
    { username: 'xyz1', password: 'xyz1' },
    { username: 'xyz2', password: 'xyz2' },
    { username: 'xyz3', password: 'xyz3' },
    { username: 'xyz4', password: 'xyz4' },
    { username: 'xyz5', password: 'xyz5' },
    { username: 'xyz6', password: 'xyz6' },
    { username: 'xyz7', password: 'xyz7' },
    { username: 'xyz8', password: 'xyz8' },
    { username: 'xyz9', password: 'xyz9' },
    { username: 'xyz10', password: 'xyz10' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = validUsers.find(u => u.username === username && u.password === password);
      
      if (user) {
        onLogin(username);
      } else {
        setError('Invalid credentials. Please use one of the demo accounts.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="bank-logo">🏦</div>
          <h1>Vaibhavanidhi Bank</h1>
          <p>Welcome back! Please sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-credentials">
            <strong>Demo Credentials:</strong><br />
            Username: <code>xyz1</code> to <code>xyz10</code><br />
            Password: Same as username
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;