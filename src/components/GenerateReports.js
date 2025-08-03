import React, { useState, useEffect } from 'react';
import './GenerateReports.css';

const GenerateReports = ({ onBack }) => {
  const [applications, setApplications] = useState([]);
  const [selectedReport, setSelectedReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Load applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('loanApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  const downloadCSV = (data, filename) => {
    // Create CSV content
    const csvContent = data.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateLoanApplicationsReport = () => {
    setIsGenerating(true);
    
    // Create table data
    const headers = ['ID', 'Applicant Name', 'Loan Type', 'Amount', 'Tenure (months)', 'Status', 'Submitted Date'];
    const tableData = applications.map(app => [
      app.id || 'N/A',
      `${app.firstName} ${app.lastName}`,
      app.loanType || 'N/A',
      app.loanAmount ? `₹${app.loanAmount.toLocaleString('en-IN')}` : 'N/A',
      app.loanTenure || 'N/A',
      app.status || 'pending',
      new Date(app.submittedDate).toLocaleDateString('en-IN')
    ]);
    
    const allData = [headers, ...tableData];
    downloadCSV(allData, 'loan-applications-summary');
    setIsGenerating(false);
  };

  const generateDetailedReport = () => {
    setIsGenerating(true);
    
    const headers = [
      'ID', 'First Name', 'Last Name', 'Aadhar Number', 'Mobile Number', 'Email',
      'Address', 'City', 'State', 'Pincode', 'Loan Type', 'Loan Amount', 
      'Tenure (months)', 'Purpose', 'Bank Name', 'Account Number', 'IFSC Code',
      'Status', 'Submitted Date'
    ];
    
    const tableData = applications.map(app => [
      app.id || 'N/A',
      app.firstName || 'N/A',
      app.lastName || 'N/A',
      app.aadharNumber || 'N/A',
      app.mobileNumber || 'N/A',
      app.email || 'N/A',
      app.addressLine1 || 'N/A',
      app.city || 'N/A',
      app.state || 'N/A',
      app.pincode || 'N/A',
      app.loanType || 'N/A',
      app.loanAmount || 'N/A',
      app.loanTenure || 'N/A',
      app.purpose || 'N/A',
      app.bankName || 'N/A',
      app.accountNumber || 'N/A',
      app.ifscCode || 'N/A',
      app.status || 'pending',
      new Date(app.submittedDate).toLocaleDateString('en-IN')
    ]);
    
    const allData = [headers, ...tableData];
    downloadCSV(allData, 'detailed-loan-report');
    setIsGenerating(false);
  };

  const handleGenerateReport = () => {
    if (selectedReport === 'applications') {
      generateLoanApplicationsReport();
    } else if (selectedReport === 'detailed') {
      generateDetailedReport();
    }
  };

  return (
    <div className="generate-reports">
      <div className="reports-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>Generate Reports</h1>
      </div>

      <div className="reports-container">
        <div className="report-options">
          <h2>Select Report Type</h2>
          
          <div className="report-option">
            <input
              type="radio"
              id="applications"
              name="reportType"
              value="applications"
              checked={selectedReport === 'applications'}
              onChange={(e) => setSelectedReport(e.target.value)}
            />
            <label htmlFor="applications">
              <div className="option-content">
                <div className="option-icon">📋</div>
                <div className="option-details">
                  <h3>Loan Applications Summary</h3>
                  <p>Download a summary table of all loan applications (CSV format)</p>
                </div>
              </div>
            </label>
          </div>

          <div className="report-option">
            <input
              type="radio"
              id="detailed"
              name="reportType"
              value="detailed"
              checked={selectedReport === 'detailed'}
              onChange={(e) => setSelectedReport(e.target.value)}
            />
            <label htmlFor="detailed">
              <div className="option-content">
                <div className="option-icon">📄</div>
                <div className="option-details">
                  <h3>Detailed Loan Report</h3>
                  <p>Download detailed information for each application (CSV format)</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="report-actions">
          <div className="report-stats">
            <h3>Report Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{applications.length}</span>
                <span className="stat-label">Total Applications</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {applications.filter(app => app.status === 'pending').length}
                </span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {applications.filter(app => app.status === 'approved').length}
                </span>
                <span className="stat-label">Approved</span>
              </div>
            </div>
          </div>

          <button
            className="generate-button"
            onClick={handleGenerateReport}
            disabled={!selectedReport || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate CSV Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports; 