import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';

function App() {
  return (
    <>
      <Router>
        <div>
       

          <Routes>
            <Route path="/add" element={<AddProduct />} />
            <Route path="/" element={<ShowProducts />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;