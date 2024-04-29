import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';
import UpdateProductForm from './pages/UpdateProductForm';
import VendorRegisterForm from './pages/VendorRegisterForm';
import './App.css';  // Ensure you have an App.css file for styling

const App = () => {
  const [telegramId, setTelegramId] = useState('');
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('userId');
    setTelegramId(userId);
    window.Telegram?.WebApp?.ready();
  }, []);

  const handleButtonClick = (button) => setActiveButton(button);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/add" element={<AddProduct telegramId={telegramId} />} />
          <Route path="/" element={<ShowProducts telegramId={telegramId} />} />
          <Route path="/update" element={<UpdateProductForm />} />
          <Route path="/register" element={<VendorRegisterForm telegramId={telegramId} />} />
        </Routes>
        <nav className="bottom-nav">
          <Link to="/add" onClick={() => handleButtonClick('add')} className={`nav-button ${activeButton === 'add' ? 'active' : ''}`}>Add</Link>
          <Link to="/" onClick={() => handleButtonClick('products')} className={`nav-button ${activeButton === 'products' ? 'active' : ''}`}>Products</Link>
          <Link to="/update" onClick={() => handleButtonClick('update')} className={`nav-button ${activeButton === 'update' ? 'active' : ''}`}>Update</Link>
          <Link to="/register" onClick={() => handleButtonClick('register')} className={`nav-button ${activeButton === 'register' ? 'active' : ''}`}>+</Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;
