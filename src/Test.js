import React, { useState } from 'react';
import './Test.css'; // Don't forget to rename the corresponding CSS file
import drivers from './TestData/drivers.json'; // Import drivers.json
import history from "./TestData/history.json";

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
          <button onClick={toggleDrawer}>Open Drawer</button>
        )}
        {isDrawerOpen && (
          <button onClick={closeDrawer} className="back-arrow">&#8592; Close</button>
        )}
      </header>
      <aside className={`Test-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="Drawer-header">
          <button onClick={closeDrawer} className="back-arrow">&#8592; Close</button>
        </div>
        <ul>
          <li onClick={() => handleItemClick('profile')}>Profile</li>
          <li onClick={() => handleItemClick('setting')}>Setting</li>
          <li onClick={() => handleItemClick('help')}>Help</li>
        </ul>
      </aside>
      <main className="Test-main">
        {selectedItem === 'profile' && (
          <div>
            <h2>Profile Content</h2>
            <p>This is the content for Profile.</p>
          </div>
        )}
        {selectedItem === 'setting' && (
          <div>
            <h2>Settings Content</h2>
            <p>This is the content for Settings.</p>
          </div>
        )}
        {selectedItem === 'help' && (
          <div>
            <h2>Help Content</h2>
            <p>This is the content for Help.</p>
          </div>
        )}
        {selectedItem === 'near' && (
          <div>
            {/* <h2>Near Rides</h2> */}
            <div className="cards-container">
              {drivers.map(driver => (
                <div key={driver.driverId} className="card">
                  <h3>{driver.name}</h3>
                  <p><strong>Phone:</strong> {driver.phone}</p>
                  <p><strong>Car ID:</strong> {driver.carId}</p>
                  <p><strong>Model:</strong> {driver.model}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedItem === 'history' && (
          <div>
          {/* <h2>Near Rides</h2> */}
          <div className="cards-container">
            {history.map(driver => (
              <div key={history.driverId} className="card">
                <h3>{driver.name}</h3>
                <p><strong>Distance:</strong> {history.kilometer}</p>
                <p><strong>Car ID:</strong> {history.driverId}</p>
                <p><strong>endpoint:</strong> {history.model}</p>
              </div>
            ))}
          </div>
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
        <button onClick={() => handleItemClick('near')}>Near</button>
        <button onClick={() => handleItemClick('history')}>History</button>
        <button onClick={() => handleItemClick('settings')}>Settings</button>
      </footer>
    </div>
  );
}

export default Test;
