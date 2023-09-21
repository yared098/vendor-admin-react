import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/forms.css';

const VendorRegisterForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user is already registered when the component mounts
    checkRegistrationStatus();
  }, []);

  const checkRegistrationStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://neari.marketing/api/vendor/${0}`, {
        // Add any necessary headers or parameters for your API request
      });
      if (response.status === 200) {
        setIsRegistered(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error checking registration status:', error);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Perform vendor registration logic here
    // You can access the entered values in the state variables (companyName, phone, email)

    try {
      setIsLoading(true);
      // Make your API request to register the vendor
      // Example using axios:
      const response = await axios.post('https://negari.marketing/api/vendor/', {
        companyName,
        phone,
        email,
      });
      setIsRegistered(true);
      setIsLoading(false);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.log('Error registering vendor:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isRegistered) {
    return (
      <div>
        <h2>Already Registered</h2>
        <p>You have already registered as a vendor.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Company Name:
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default VendorRegisterForm;