// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
// import AddProduct from './pages/AddProduct';
// import ShowProducts from './pages/ShowProducts';
// import UpdateProductForm from './pages/UpdateProductForm';
// import VendorRegisterForm from './pages/VendorRegisterForm';
// const tele = window.Telegram.WebApp;

// tele.MainButton.title = "Phone ";

// function App() {
//   const [telegramId, setTelegramId] = useState('');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     // const userId = queryParams.get('userId');
//     const userId = queryParams.get('userId');
//     console.log(`User ID received from Telegram: ${userId}`);
//     setTelegramId(userId);

//     if (window.Telegram && window.Telegram.WebApp) {
//       const tele = window.Telegram.WebApp;
//       tele.ready();
//     }
//   }, []);

//   const [activeButton, setActiveButton] = useState('');

//   const handleButtonClick = (button) => {
//     setActiveButton(button);
//   };

//   return (
//     <Router>
//       <div style={{ paddingBottom: '100px' }}>
//         <Routes>
//           <Route path="/add" element={<AddProduct telegramId={telegramId} />} />
//           <Route path="/" element={<ShowProducts telegramId={telegramId} />} />
//           <Route path="/update" element={<UpdateProductForm />} />
//           <Route path="/register" element={<VendorRegisterForm telegramId={telegramId} />} />
//         </Routes>
//       </div>

//       <nav style={{ borderRadius: '2px', position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'var(--tg-theme-button-color)' }}>
//         <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0 }}>
//           <li>
//             <Link to="/add" className="nav-link">
//               <button
//                 className={`nav-button ${activeButton === 'add' ? 'active' : ''}`}
//                 onClick={() => handleButtonClick('add')}
//               >
//                 Add
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/" className="nav-link">
//               <button
//                 className={`nav-button ${activeButton === 'products' ? 'active' : ''}`}
//                 onClick={() => handleButtonClick('products')}
//               >
//                 Products
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/update" className="nav-link">
//               <button
//                 className={`nav-button ${activeButton === 'update' ? 'active' : ''}`}
//                 onClick={() => handleButtonClick('update')}
//               >
//                 Update
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/register" className="nav-link">
//               <button
//                 className={`nav-button ${activeButton === 'register' ? 'active' : ''}`}
//                 onClick={() => handleButtonClick('register')}
//               >
//                 +
//               </button>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';
import UpdateProductForm from './pages/UpdateProductForm';
import VendorRegisterForm from './pages/VendorRegisterForm';

// const tele = window.Telegram.WebApp;
// tele.MainButton.title = "Phone ";
const tele = window.Telegram.WebApp;
tele.MainButton.text = "Admin Dashboard";

tele.MainButton.show().onClick(() => {
  tele.MainButton.show();
});

function App() {
  const [telegramId, setTelegramId] = useState('');
  const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    tele.ready();
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('userId');
    console.log(`User ID received from Telegram: ${userId}`);
    setTelegramId(userId);

    if (window.Telegram && window.Telegram.WebApp) {
      const tele = window.Telegram.WebApp;
      tele.ready();
    }

    // Function to update button styles based on screen width
    const updateButtonStyle = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setButtonStyle({
          padding: '4px 8px',
          fontSize: '10px',
        });
      } else if (width < 600) {
        setButtonStyle({
          padding: '6px 10px',
          fontSize: '12px',
        });
      } else {
        setButtonStyle({
          padding: '8px 12px',
          fontSize: '14px',
        });
      }
    };

    // Initial button style update
    updateButtonStyle();

    // Add event listener for window resize
    window.addEventListener('resize', updateButtonStyle);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateButtonStyle);
    };
  }, []);

  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Router>
      <div style={{ paddingBottom: '56px', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/add" element={<AddProduct telegramId={telegramId} />} />
          <Route path="/" element={<ShowProducts telegramId={telegramId} />} />
          <Route path="/update" element={<UpdateProductForm />} />
          <Route path="/register" element={<VendorRegisterForm telegramId={telegramId} />} />
        </Routes>
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'var(--tg-theme-button-color)',
        borderTop: '1px solid #ddd',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        padding: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Center items vertically
      }}>
        <ul style={{
          display: 'flex',
          justifyContent: 'space-around',
          listStyle: 'none',
          padding: '0',
          margin: '0',
          width: '100%',
          maxWidth: '600px', // Adjust as needed
          boxSizing: 'border-box', // Ensure padding and border are included in width
        }}>
          <li>
            <Link to="/add" className="nav-link">
              <button
                className={`nav-button ${activeButton === 'add' ? 'active' : ''}`}
                onClick={() => handleButtonClick('add')}
                style={{
                  ...buttonStyle,
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#fff',
                  color: '#333',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
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
                style={{
                  ...buttonStyle,
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#fff',
                  color: '#333',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
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
                style={{
                  ...buttonStyle,
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#fff',
                  color: '#333',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                Update
              </button>
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav-link">
              <button
                className={`nav-button ${activeButton === 'register' ? 'active' : ''}`}
                onClick={() => handleButtonClick('register')}
                style={{
                  ...buttonStyle,
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#fff',
                  color: '#333',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                Profile
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </Router>
  );
}

export default App;

