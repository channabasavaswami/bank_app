import React, { useState, useEffect } from 'react';
import './ViewApplications.css';

const ViewApplications = ({ onBack }) => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Load applications from localStorage on component mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('loanApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Filter applications based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app => 
        app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.aadharNumber?.includes(searchTerm) ||
        app.mobileNumber?.includes(searchTerm) ||
        app.loanType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.loanAmount?.toString().includes(searchTerm)
      );
      setFilteredApplications(filtered);
    }
  }, [searchTerm, applications]);

  // Get applications to display (top 5 or all based on search)
  const getDisplayApplications = () => {
    if (searchTerm.trim() !== '') {
      return filteredApplications;
    }
    return showAll ? filteredApplications : filteredApplications.slice(0, 5);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
      case 'under_review': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'pending': return 'Pending';
      case 'rejected': return 'Rejected';
      case 'under_review': return 'Under Review';
      default: return 'New';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="view-applications">
      <div className="applications-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>View Loan Applications</h1>
        <div className="applications-stats">
          <span>Total Applications: {applications.length}</span>
          {searchTerm && <span>Search Results: {filteredApplications.length}</span>}
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, Aadhar, mobile, loan type, or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => setSearchTerm('')}
          >
            Clear Search
          </button>
        )}
      </div>

      <div className="applications-container">
        {getDisplayApplications().length === 0 ? (
          <div className="no-applications">
            <div className="no-applications-icon">📋</div>
            <h3>No applications found</h3>
            <p>
              {searchTerm 
                ? 'No applications match your search criteria.' 
                : 'No loan applications have been submitted yet.'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="applications-grid">
              {getDisplayApplications().map((app, index) => (
                <div key={app.id || index} className="application-card">
                  <div className="application-header">
                    <div className="application-id">#{app.id || `LA${String(index + 1).padStart(3, '0')}`}</div>
                    <div 
                      className="application-status"
                      style={{ backgroundColor: getStatusColor(app.status || 'pending') }}
                    >
                      {getStatusText(app.status || 'pending')}
                    </div>
                  </div>
                  
                  <div className="application-body">
                    <div className="applicant-info">
                      <h4>{app.firstName} {app.lastName}</h4>
                      <p><strong>Aadhar:</strong> {app.aadharNumber}</p>
                      <p><strong>Mobile:</strong> {app.mobileNumber}</p>
                      <p><strong>Email:</strong> {app.email || 'Not provided'}</p>
                    </div>
                    
                    <div className="loan-info">
                      <p><strong>Loan Type:</strong> {app.loanType}</p>
                      <p><strong>Amount:</strong> {formatAmount(app.loanAmount)}</p>
                      <p><strong>Tenure:</strong> {app.loanTenure} months</p>
                      <p><strong>Purpose:</strong> {app.purpose}</p>
                    </div>
                    
                    <div className="application-footer">
                      <span className="application-date">
                        Submitted: {formatDate(app.submittedDate || new Date())}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!searchTerm && applications.length > 5 && (
              <div className="show-more-section">
                <button 
                  className="show-more-button"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? 'Show Less' : `Show All (${applications.length - 5} more)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewApplications; 