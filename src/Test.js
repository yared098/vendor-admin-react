import React, { useState } from 'react';
import './Test.css'; // Don't forget to rename the corresponding CSS file
import drivers from './TestData/drivers.json'; // Import drivers.json
import history from './TestData/history.json'; // Import history.json

function Test() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(false);
  };

  return (
    <div className="Test">
      
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
            <div className="list-group">
              {drivers.map(driver => (
                <a
                  key={driver.driverId}
                  href="http://www.google.com"
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{driver.name}</h5>
                    <small className="text-muted">{driver.phone}</small>
                  </div>
                  <p className="mb-1">Car ID: {driver.carId}</p>
                  <small className="text-muted">Model: {driver.model}</small>
                </a>
              ))}
            </div>
          </div>
        )}
        {selectedItem === 'history' && (
  <div>
    <div className="list-group">
      {history.map(item => (
        <a
          key={item.driverId}  // Updated this line
          href="http://www.google.com"
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.carId}</h5>
            <small className="text-muted">{item.kilometer} km</small>
          </div>
          <p className="mb-1">Price: {item.price}</p>
          <small className="text-muted">Endpoint: {item.model}</small>
        </a>
      ))}
    </div>
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
