import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState('');

  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Loans',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: '💰',
      color: '#2a5298'
    },
    {
      title: 'Active Accounts',
      value: '5,892',
      change: '+8%',
      changeType: 'positive',
      icon: '👥',
      color: '#28a745'
    },
    {
      title: 'Total Deposits',
      value: '₹45.2Cr',
      change: '+15%',
      changeType: 'positive',
      icon: '🏦',
      color: '#ffc107'
    },
    {
      title: 'Pending Applications',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: '📋',
      color: '#dc3545'
    }
  ];

  const quickActions = [
    {
      title: 'Create Loan',
      description: 'Start a new loan application',
      icon: '📝',
      action: () => onNavigate('create-loan'),
      color: '#2a5298'
    },
    {
      title: 'View Applications',
      description: 'View and manage all loan applications',
      icon: '📋',
      action: () => onNavigate('view-applications'),
      color: '#28a745'
    },
    {
      title: 'View Services',
      description: 'Explore all banking services',
      icon: '🏦',
      action: () => onNavigate('services'),
      color: '#ffc107'
    },
    {
      title: 'Generate Reports',
      description: 'Create and download reports',
      icon: '📊',
      action: () => onNavigate('reports'),
      color: '#17a2b8'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'loan_approved',
      message: 'Loan application LA001 approved for Ramesh Kumar',
      time: '2 hours ago',
      amount: '₹5,00,000'
    },
    {
      id: 2,
      type: 'new_application',
      message: 'New loan application submitted by Sita Devi',
      time: '4 hours ago',
      amount: '₹25,00,000'
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'EMI payment received from Mohan Singh',
      time: '6 hours ago',
      amount: '₹15,000'
    },
    {
      id: 4,
      type: 'account_opened',
      message: 'New savings account opened for Priya Sharma',
      time: '1 day ago',
      amount: '₹10,000'
    }
  ];

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      onNavigate('loan-details');
    }
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'loan_approved': return '✅';
      case 'new_application': return '📝';
      case 'payment_received': return '💰';
      case 'account_opened': return '🏦';
      default: return '📌';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'loan_approved': return '#28a745';
      case 'new_application': return '#2a5298';
      case 'payment_received': return '#ffc107';
      case 'account_opened': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Vaibhavanidhi Bank</h1>
        <p>Manage your banking operations efficiently</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.changeType}`}>
                {stat.change} from last month
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search with Aadhar Number or Voter ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            🔍 Search
          </button>
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="action-card"
              onClick={action.action}
              style={{ borderLeftColor: action.color }}
            >
              <div className="action-icon" style={{ color: action.color }}>
                {action.icon}
              </div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-icon"
                style={{ backgroundColor: getActivityColor(activity.type) }}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
              <div className="activity-amount">{activity.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="info-cards-section">
        <div className="info-card">
          <h3>📈 Bank Performance</h3>
          <p>Total Assets: ₹125.6 Crores</p>
          <p>Net Profit: ₹8.2 Crores</p>
          <p>Customer Satisfaction: 94%</p>
        </div>
        <div className="info-card">
          <h3>🎯 This Month's Goals</h3>
          <p>Loan Disbursements: ₹12.5 Cr</p>
          <p>New Accounts: 150</p>
          <p>Customer Retention: 98%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 