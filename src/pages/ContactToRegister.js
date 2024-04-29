import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate component
import './ContactToRegister.css'; // Ensure this points to your CSS stylesheet

const ContactToRegister = () => {
  const [agree, setAgree] = useState(false);
  const [redirectToRegister, setRedirectToRegister] = useState(false); // State to control redirection

  const handleRegisterClick = () => {
    setRedirectToRegister(true); // Set state to true to trigger redirection
  };

  if (redirectToRegister) {
    return <Navigate to="/register" />; // Redirect to the register page
  }

  return (
    <div className="contact-container">
      <h1>Welcome to Ethio 24 Vendors Market</h1>
      <p>
        This platform is designed to help you increase your market size, attract more customers,
        and track your business performance effectively. Whether you are looking to accept new orders,
        manage your inventory, or analyze sales trends, Ethio 24 provides all the tools you need
        to succeed in today's competitive market.
      </p>
      <h2>Please Contact to Register</h2>
      <p>
        To access this service, you need to be a registered vendor. Please contact support to complete
        your registration. Join us today and transform how you manage and grow your business!
      </p>
      <div className="contact-info">
        <p>📞 Phone: 0988107722</p>
        <p>📧 Email: <a href="mailto:fdessalew@gmial.com">fdessalew@gmial.com</a></p>
        <p>🔗 Telegram: <a href="https://t.me/yared_122">@yared_122</a></p>
      </div>
      <div className="registration-consent">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="agree">I agree to the Terms and Conditions</label>
      </div>
      {agree && (
        <button className="register-btn" onClick={handleRegisterClick}>Register Now</button>
      )}
    </div>
  );
};

export default ContactToRegister;
