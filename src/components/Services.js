import React, { useState } from 'react';
import './Services.css';

const Services = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'loans',
      name: 'Loans',
      icon: '💰',
      description: 'Various loan products for different needs',
      features: [
        'Personal Loans - Up to ₹10,00,000',
        'Home Loans - Up to ₹50,00,000',
        'Vehicle Loans - Up to ₹15,00,000',
        'Education Loans - Up to ₹25,00,000',
        'Business Loans - Up to ₹1,00,00,000'
      ],
      interestRates: '6.8% - 10.5%',
      processingTime: '3-7 days'
    },
    {
      id: 'fixed-deposits',
      name: 'Fixed Deposits',
      icon: '🏦',
      description: 'Secure investment with guaranteed returns',
      features: [
        'Interest rates up to 7.5%',
        'Flexible tenure options',
        'Premature withdrawal facility',
        'Auto-renewal option',
        'Tax benefits available'
      ],
      interestRates: '6.0% - 7.5%',
      processingTime: 'Same day'
    },
    {
      id: 'savings-account',
      name: 'Savings Account',
      icon: '💳',
      description: 'Basic savings account with digital banking',
      features: [
        'Zero balance account option',
        'Free ATM transactions',
        'Mobile banking facility',
        'Internet banking access',
        'Debit card with rewards'
      ],
      interestRates: '3.5% - 4.0%',
      processingTime: 'Same day'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleApplyNow = (serviceId) => {
    // This would typically navigate to the application form
    alert(`Redirecting to ${serviceId} application form...`);
    closeModal();
  };

  const handleDownloadBrochure = () => {
    // Create a simple brochure content
    const brochureContent = `VAIBHAVANIDHI Cooperative Bank Limited - Services Brochure

Our Comprehensive Banking Services:

1. LOANS
   - Personal Loans: Up to ₹10,00,000
   - Home Loans: Up to ₹50,00,000
   - Vehicle Loans: Up to ₹15,00,000
   - Education Loans: Up to ₹25,00,000
   - Business Loans: Up to ₹1,00,00,000
   Interest Rates: 6.8% - 10.5%

2. FIXED DEPOSITS
   - Interest rates up to 7.5%
   - Flexible tenure options
   - Premature withdrawal facility
   - Auto-renewal option
   - Tax benefits available

3. SAVINGS ACCOUNT
   - Zero balance account option
   - Free ATM transactions
   - Mobile banking facility
   - Internet banking access
   - Debit card with rewards

Contact Us:
Phone: 080-12345678
Email: info@vaibhavanidhi.com
Website: www.vaibhavanidhi.com

Generated on: ${new Date().toLocaleDateString()}`;

    // Create and download the brochure
    const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Vaibhavanidhi_Services_Brochure_${new Date().toISOString().split('T')[0]}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="services-header-content">
          <h1>Our Banking Services</h1>
          <p>Discover our comprehensive range of financial products and services</p>
        </div>
        <button className="download-brochure-btn" onClick={handleDownloadBrochure}>
          📄 Download Brochure
        </button>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="service-card"
            onClick={() => handleServiceClick(service)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <div className="service-highlights">
              <span className="highlight">Interest: {service.interestRates}</span>
              <span className="highlight">Processing: {service.processingTime}</span>
            </div>
            <button className="learn-more-btn">Learn More</button>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content service-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="service-modal-header">
                <span className="service-modal-icon">{selectedService.icon}</span>
                <h3>{selectedService.name}</h3>
              </div>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <p className="service-modal-description">{selectedService.description}</p>
              
              <div className="service-details">
                <div className="detail-section">
                  <h4>Key Features</h4>
                  <ul className="features-list">
                    {selectedService.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h4>Quick Info</h4>
                  <div className="quick-info">
                    <div className="info-item">
                      <span className="info-label">Interest Rate:</span>
                      <span className="info-value">{selectedService.interestRates}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Processing Time:</span>
                      <span className="info-value">{selectedService.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleApplyNow(selectedService.id)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services; 