import React, { useState } from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';
import UpdateProductForm from './pages/UpdateProductForm';
import "./pages/forms.css"

// const tele = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tele = window.Telegram.WebApp;
      tele.ready();
    }
  }, []);

  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <>
      <Router>
        <div style={{ paddingBottom: '100px' }}>
          <Routes>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/" element={<ShowProducts />} />
            <Route path="/update" element={<UpdateProductForm />} />
          </Routes>
        </div>

        <nav style={{ borderRadius: '2px', position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff' }}>
          <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0 }}>
            <li>
              <Link to="/add" className="nav-link">
                <button
                  className={`nav-button ${activeButton === 'add' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('add')}
                >
                  Add 
                </button>
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link">
                <button
                  className={`nav-button ${activeButton === 'products' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('products')}
                >
                  Products
                </button>
              </Link>
            </li>
            <li>
              <Link to="/update" className="nav-link">
                <button
                  className={`nav-button ${activeButton === 'update' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('update')}
                >
                  Update
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </Router>
    </>
  );
}

export default App;