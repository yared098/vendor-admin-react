import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/register.css';

const VendorRegisterForm = ({ telegramId }) => {

   const incomingOrders = [
    {
      id: 1,
      customerName: 'Yared Fentahun',
      orderDetails: 'Order 1 details',
      orderStatus:false
    },
    {
      id: 2,
      customerName: 'Dessalegn Fentahun',
      orderDetails: 'Order 2 details',
      orderStatus:false
    },
    // Add more objects as needed
    {
      id: 3,
      customerName: 'New customer',
      orderDetails: 'Order 3 details',
      orderStatus:true
    },
    {
      id: 4,
      customerName: 'Bob Anderson',
      orderDetails: 'Order 4 details',
      orderStatus:true
    },
    {
      id: 5,
      customerName: 'Eve Roberts',
      orderDetails: 'Order 5 details',
      orderStatus:false
    },
    {
      id: 6,
      customerName: 'New customer',
      orderDetails: 'Order 6 details',
      orderStatus:true
    },
    {
      id: 7,
      customerName: 'Olivia Davis',
      orderDetails: 'Order 7 details',
      orderStatus:false
    },
    {
      id: 8,
      customerName: 'New customer',
      orderDetails: 'Order 8 details',
      orderStatus:false
    },
    {
      id: 9,
      customerName: 'New customer',
      orderDetails: 'Order 9 details',
      orderStatus:true
    },
    {
      id: 10,
      customerName: 'New customer',
      orderDetails: 'Order 10 details',
      orderStatus:true
    }
  ];
  


  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [postLimit, setPostLimit] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkRegistrationStatus(telegramId);
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
        date_created: new Date().toString(), // Set the current date as the default value
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
        <h2>Welcome to Ethio-24 Market</h2>
        <p>You have already registered .</p>
        <p> Your public link {telegramId}</p>
        {/* Render the horizontal list continuously */}
        <div className="horizontal-list">
          {incomingOrders.map((order) => (
          <div key={order.id} className="order-item">
          <img src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_640.png" alt="Profile" className="profile-image" style={{ borderRadius: '50%' }} />
          <div>
            <p>{order.customerName}</p>
            <p>{order.orderDetails}</p>
          </div>
          <p className={order.orderStatus ? 'success' : 'failure'}>{order.orderStatus ? 'Yes Success' : 'Not Success'}</p>
        </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleFormSubmit} style={{ backgroundColor: 'var(--tg-theme-bg-color)' }}>
      <label>
        <p> Register as Vendor</p>
        <p>Telegram ID: {telegramId}</p>
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
      <label>
        Telegram ID: {"-" + telegramId}
        {/* Removed the input field for telegram_id */}
      </label>
      <br />
      <label>
        Post Limit:
        <input
          type="text"
          value={postLimit}
          onChange={(e) => setPostLimit(e.target.value)}
        />
      </label>
      <br />
      {/* Removed the input field for date_created */}
      <button   style={{backgroundColor:'green'}} type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default VendorRegisterForm;
