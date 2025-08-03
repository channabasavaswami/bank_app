import React, { useState } from 'react';
import './CreateLoanUser.css';

const CreateLoanUser = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', fatherName: '', motherName: '', dateOfBirth: '',
    gender: '', maritalStatus: '', aadharNumber: '', panNumber: '', voterIdNumber: '',
    mobileNumber: '', alternateMobile: '', email: '', occupation: '', monthlyIncome: '',
    addressLine1: '', addressLine2: '', city: '', state: '', pincode: '',
    bankName: '', accountNumber: '', ifscCode: '', branchName: '',
    loanType: '', loanAmount: '', loanTenure: '', purpose: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
        if (formData.aadharNumber && formData.aadharNumber.length !== 12) {
          newErrors.aadharNumber = 'Aadhar number must be 12 digits';
        }
        break;
      case 2:
        if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
        if (!formData.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        break;
      case 3:
        if (!formData.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
        if (!formData.loanType) newErrors.loanType = 'Loan type is required';
        if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
        if (!formData.loanTenure) newErrors.loanTenure = 'Loan tenure is required';
        if (!formData.purpose) newErrors.purpose = 'Loan purpose is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Get existing applications to determine next ID
      const existingApplications = JSON.parse(localStorage.getItem('loanApplications') || '[]');
      const nextId = existingApplications.length + 1;
      const applicationId = `LA${String(nextId).padStart(3, '0')}`;
      
      // Create application object with additional metadata
      const application = {
        ...formData,
        id: applicationId,
        status: 'pending',
        submittedDate: new Date().toISOString(),
        applicationNumber: applicationId
      };

      // Save to localStorage
      existingApplications.unshift(application); // Add to beginning of array
      localStorage.setItem('loanApplications', JSON.stringify(existingApplications));

      console.log('Loan application submitted:', application);
      alert(`Loan application submitted successfully! Application ID: ${applicationId}`);
      onBack();
    }
  };

  const renderStep1 = () => (
    <div className="form-step">
      <h3>Personal Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={errors.dateOfBirth ? 'error' : ''}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>
        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Aadhar Number *</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleInputChange}
            maxLength="12"
            className={errors.aadharNumber ? 'error' : ''}
          />
          {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
        </div>
        <div className="form-group">
          <label>PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleInputChange}
            maxLength="10"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-step">
      <h3>Contact & Address Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            maxLength="10"
            className={errors.mobileNumber ? 'error' : ''}
          />
          {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
        </div>
        <div className="form-group">
          <label>Alternate Mobile</label>
          <input
            type="tel"
            name="alternateMobile"
            value={formData.alternateMobile}
            onChange={handleInputChange}
            maxLength="10"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Address Line 1 *</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
          className={errors.addressLine1 ? 'error' : ''}
        />
        {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
      </div>
      <div className="form-group">
        <label>Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={errors.state ? 'error' : ''}
          />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>
      </div>
      <div className="form-group">
        <label>Pincode *</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          maxLength="6"
          className={errors.pincode ? 'error' : ''}
        />
        {errors.pincode && <span className="error-message">{errors.pincode}</span>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-step">
      <h3>Bank & Loan Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Bank Name *</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            className={errors.bankName ? 'error' : ''}
          />
          {errors.bankName && <span className="error-message">{errors.bankName}</span>}
        </div>
        <div className="form-group">
          <label>Account Number *</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className={errors.accountNumber ? 'error' : ''}
          />
          {errors.accountNumber && <span className="error-message">{errors.accountNumber}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>IFSC Code *</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            maxLength="11"
            className={errors.ifscCode ? 'error' : ''}
          />
          {errors.ifscCode && <span className="error-message">{errors.ifscCode}</span>}
        </div>
        <div className="form-group">
          <label>Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Loan Type *</label>
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleInputChange}
            className={errors.loanType ? 'error' : ''}
          >
            <option value="">Select Loan Type</option>
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
            <option value="vehicle">Vehicle Loan</option>
            <option value="education">Education Loan</option>
            <option value="business">Business Loan</option>
          </select>
          {errors.loanType && <span className="error-message">{errors.loanType}</span>}
        </div>
        <div className="form-group">
          <label>Loan Amount (₹) *</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className={errors.loanAmount ? 'error' : ''}
          />
          {errors.loanAmount && <span className="error-message">{errors.loanAmount}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Loan Tenure (months) *</label>
          <input
            type="number"
            name="loanTenure"
            value={formData.loanTenure}
            onChange={handleInputChange}
            className={errors.loanTenure ? 'error' : ''}
          />
          {errors.loanTenure && <span className="error-message">{errors.loanTenure}</span>}
        </div>
        <div className="form-group">
          <label>Purpose *</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className={errors.purpose ? 'error' : ''}
          />
          {errors.purpose && <span className="error-message">{errors.purpose}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="create-loan-user">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>Create Loan Application</h1>
        <div className="step-indicator">
          Step {currentStep} of 3
        </div>
      </div>

      <form onSubmit={handleSubmit} className="loan-form">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button type="submit" className="btn btn-success">
              Submit Application
            </button>
          )}
          <button type="button" className="btn btn-cancel" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLoanUser;
