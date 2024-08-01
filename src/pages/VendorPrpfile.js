import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/register.css';
// import { useParams } from 'react-router-dom';
const VendorRegisterForm = ({ telegramId }) => {
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram_id, setTelegram_id] = useState('');
  const [postLimit, setPostLimit] = useState('');
  const [date_created, setDate_created] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const { telegramId } = useParams();

  useEffect(() => {
    checkRegistrationStatus(telegramId);
    // if (telegramId) {
    //   checkRegistrationStatus(telegramId);
    // }
  }, [telegramId]);

  const checkRegistrationStatus = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://negari.marketing/api/vendor/te/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
        },
      });

      console.log(response.body);
      console.log("This is the response");

      if (response.status === 200) {
        setIsRegistered(true);
      } else if (response.status === 404) {
        setIsRegistered(false);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error checking registration status:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post('https://negari.marketing/api/vendor/', {
        companyName,
        phone,
        email,
        telegram_id: telegramId,
        postLimit,
        date_created,
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
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
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
    <form onSubmit={handleFormSubmit}style={{ backgroundColor: 'var(--tg-theme-bg-color)' }} >
      <label>
      <p>Telegram ID: {telegramId}</p>
        Company Name:
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Telegram ID:{ "-" +telegramId}
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={telegram_id}
          onChange={(e) => setTelegram_id(e.target.value)}
        />
      </label>
      <br />
      <label>
        Post Limit:
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={postLimit}
          onChange={(e) => setPostLimit(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date Created:
        <input
         style={{borderRadius:'10px'}}
          type="text"
          value={date_created}
          onChange={(e) => setDate_created(e.target.value)}
        />
      </label>
      <br />
      <button    style={{borderRadius:'10px', width :'100%'}} type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default VendorRegisterForm;