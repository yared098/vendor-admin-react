// src/Test.js
import React, { useState } from 'react';
import './Test.css'; // Don't forget to rename the corresponding CSS file

function Test() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(false);
  };

  return (
    <div className="Test">
      <header className="Test-header">
        <h1>YeneRide</h1>
        {!isDrawerOpen && (
          <button onClick={toggleDrawer}> Drawer</button>
        )}
        {isDrawerOpen && (
          <button onClick={closeDrawer} className="back-arrow">&#8592; Back</button>
        )}
      </header>
      <aside className={`Test-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="Drawer-header">
          <button onClick={closeDrawer} className="back-arrow">&#8592; Back</button>
          {/* <h2>Si</h2> */}
        </div>
        <ul>
          <li onClick={() => handleItemClick('item1')}>Item 1</li>
          <li onClick={() => handleItemClick('item2')}>Item 2</li>
          <li onClick={() => handleItemClick('item3')}>Item 3</li>
        </ul>
      </aside>
      <main className="Test-main">
        {selectedItem === 'item1' && (
          <div>
            <h2>Item 1 Content</h2>
            <p>This is the content for Item 1.</p>
          </div>
        )}
        {selectedItem === 'item2' && (
          <div>
            <h2>Item 2 Content</h2>
            <p>This is the content for Item 2.</p>
          </div>
        )}
        {selectedItem === 'item3' && (
          <div>
            <h2>Item 3 Content</h2>
            <p>This is the content for Item 3.</p>
          </div>
        )}
        {selectedItem === 'home' && (
          <div>
            <h2>Home</h2>
            <p>Welcome to the Home page.</p>
          </div>
        )}
        {selectedItem === 'profile' && (
          <div>
            <h2>Profile</h2>
            <p>This is your profile.</p>
          </div>
        )}
        {selectedItem === 'settings' && (
          <div>
            <h2>Settings</h2>
            <p>Here you can change your settings.</p>
          </div>
        )}
      </main>
      <footer className="Test-footer">
        <button onClick={() => handleItemClick('home')}>Home</button>
        <button onClick={() => handleItemClick('profile')}>Profile</button>
        <button onClick={() => handleItemClick('settings')}>Settings</button>
      </footer>
    </div>
  );
}

export default Test;
