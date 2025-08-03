import React, { useState } from 'react';
import './LoanDetails.css';

const LoanDetails = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Mock data for loan applications
  const loanApplications = [
    {
      id: 'LA001',
      applicantName: 'Ramesh Kumar',
      loanType: 'Personal Loan',
      amount: 500000,
      status: 'Approved',
      appliedDate: '2024-01-15',
      aadharNumber: '123456789012',
      mobileNumber: '9876543210'
    },
    {
      id: 'LA002',
      applicantName: 'Sita Devi',
      loanType: 'Home Loan',
      amount: 2500000,
      status: 'Pending',
      appliedDate: '2024-01-20',
      aadharNumber: '234567890123',
      mobileNumber: '8765432109'
    },
    {
      id: 'LA003',
      applicantName: 'Mohan Singh',
      loanType: 'Vehicle Loan',
      amount: 800000,
      status: 'Rejected',
      appliedDate: '2024-01-18',
      aadharNumber: '345678901234',
      mobileNumber: '7654321098'
    },
    {
      id: 'LA004',
      applicantName: 'Priya Sharma',
      loanType: 'Education Loan',
      amount: 1200000,
      status: 'Approved',
      appliedDate: '2024-01-22',
      aadharNumber: '456789012345',
      mobileNumber: '6543210987'
    }
  ];

  const loanTypes = [
    {
      name: 'Personal Loan',
      interestRate: '8.5%',
      maxAmount: '₹10,00,000',
      tenure: 'Up to 5 years',
      eligibility: 'Age 21+, valid ID proof, income proof'
    },
    {
      name: 'Home Loan',
      interestRate: '7.2%',
      maxAmount: '₹50,00,000',
      tenure: 'Up to 20 years',
      eligibility: 'Age 21-65, property documents, income proof'
    },
    {
      name: 'Vehicle Loan',
      interestRate: '9.0%',
      maxAmount: '₹15,00,000',
      tenure: 'Up to 7 years',
      eligibility: 'Age 21+, vehicle documents, income proof'
    },
    {
      name: 'Education Loan',
      interestRate: '6.8%',
      maxAmount: '₹25,00,000',
      tenure: 'Up to 10 years',
      eligibility: 'Student with admission letter, co-applicant required'
    },
    {
      name: 'Business Loan',
      interestRate: '10.5%',
      maxAmount: '₹1,00,00,000',
      tenure: 'Up to 10 years',
      eligibility: 'Business registration, financial statements'
    }
  ];

  const filteredApplications = loanApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.aadharNumber.includes(searchTerm) ||
                         app.mobileNumber.includes(searchTerm);
    const matchesFilter = filterType === 'all' || app.status.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return 'status-default';
    }
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setSelectedLoan(null);
  };

  return (
    <div className="loan-details-container">
      <div className="loan-details-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>Loan Applications & Details</h1>
      </div>

      <div className="loan-details-content">
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, Aadhar, or mobile number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
          <div className="filter-box">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Loan Applications Table */}
        <div className="applications-section">
          <h2>Loan Applications</h2>
          <div className="table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant Name</th>
                  <th>Loan Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.applicantName}</td>
                    <td>{app.loanType}</td>
                    <td>₹{app.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="view-details-btn"
                        onClick={() => handleViewDetails(app)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loan Types Information */}
        <div className="loan-types-section">
          <h2>Available Loan Types</h2>
          <div className="loan-types-grid">
            {loanTypes.map((loanType, index) => (
              <div key={index} className="loan-type-card">
                <h3>{loanType.name}</h3>
                <div className="loan-type-details">
                  <p><strong>Interest Rate:</strong> {loanType.interestRate}</p>
                  <p><strong>Maximum Amount:</strong> {loanType.maxAmount}</p>
                  <p><strong>Tenure:</strong> {loanType.tenure}</p>
                  <p><strong>Eligibility:</strong> {loanType.eligibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Loan Details */}
      {selectedLoan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Loan Application Details</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Application ID:</span>
                <span className="detail-value">{selectedLoan.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Applicant Name:</span>
                <span className="detail-value">{selectedLoan.applicantName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Loan Type:</span>
                <span className="detail-value">{selectedLoan.loanType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">₹{selectedLoan.amount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value ${getStatusColor(selectedLoan.status)}`}>
                  {selectedLoan.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Applied Date:</span>
                <span className="detail-value">
                  {new Date(selectedLoan.appliedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Aadhar Number:</span>
                <span className="detail-value">{selectedLoan.aadharNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mobile Number:</span>
                <span className="detail-value">{selectedLoan.mobileNumber}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              {selectedLoan.status === 'Pending' && (
                <button className="btn btn-primary">Process Application</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanDetails;