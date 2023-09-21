import React from 'react';
import { BrowserRouter as Router, Routes,Link, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ShowProducts from './pages/ShowProducts';

function App() {
  return (
    <>
      <Router>
        <div>
        <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Show Products</Link>
              </li>
              <li>
                <Link to="/add">Add Product</Link>
              </li>
            </ul>
          </nav>
       

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