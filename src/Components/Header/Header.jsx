import React from 'react';
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Yene Delivery</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item"><a href="/">Home</a></li>
          <li className="nav-item"><a href="/about">About</a></li>
          <li className="nav-item"><a href="/services">Services</a></li>
          <li className="nav-item"><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button">Search</button>
      </div>
    </header>
  );
};

export default Header;