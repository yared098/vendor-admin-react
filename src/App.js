import React from 'react';
import {  useEffect } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';
import UpdateProductForm from './pages/UpdateProductForm';

// const tele = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tele = window.Telegram.WebApp;
      tele.ready();
    }
  }, []);
  return (
    <>
      <Router>
        <div style={{ paddingBottom: '50px' }}>
          <Routes>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/" element={<ShowProducts />} />
            <Route path="/update" element ={ <UpdateProductForm />}/>
          </Routes>
        </div>

        <nav style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f5f5f5' }}>
          <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0 }}>
            <li>
            <Link to="/add" className="nav-link nav-button">Add Product</Link>
             
            </li>
            <li>
              <Link to="/" className="nav-link">My products</Link>
            </li>
            <li>
             
              <Link to="/update" className="nav-link">Update</Link>
            </li>
          </ul>
        </nav>
      </Router>
    </>
  );
}

export default App;