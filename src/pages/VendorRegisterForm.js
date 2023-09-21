import React, { useState } from 'react';

const VendorRegisterForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform vendor registration logic here
    // You can access the entered values in the state variables (companyName, phone, email)

    // Reset the form fields
    setCompanyName('');
    setPhone('');
    setEmail('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="companyName" className="form-label">Company Name:</label>
        <input
          type="text"
          id="companyName"
          className="form-control"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input
          type="tel"
          id="phone"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default VendorRegisterForm;