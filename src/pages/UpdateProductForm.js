import React, { useEffect, useState } from 'react';
import bg from "../buregr.jpeg";
import "../pages/forms.css";


const UpdateProductForm = ({name,pricep}) => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    // Set the initial values when the component mounts
    setProductName(name);
    setPrice(pricep);
  }, [name, pricep]);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform the update product logic here
    // You can access the updated values in the state variables (productName, price, discount)

    // Reset the form fields
    setProductName('');
    setPrice('');
    setDiscount('');
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ backgroundColor: 'var(--tg-theme-bg-color)' }} >
      <div className="mb-3">
        <label className="form-label">Product ID:</label>
        <input
          type="text"
          className="form-control"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Name:</label>
        <input
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Disc...:</label>
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Product Image:</label>
        <div className="image__container">
          <img src={bg} alt={""} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Update Product</button>
    </form>
  );
};

export default UpdateProductForm;