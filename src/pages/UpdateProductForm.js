import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../pages/forms.css";

const UpdateProductForm = ({ name, pricep }) => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [Image, setImage] = useState('');
  const [discount, setDiscount] = useState('');

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productName = searchParams.get('name');
    const productPrice = searchParams.get('price');
    const productId = searchParams.get('id');
    const image = searchParams.get('image');
    const disc = searchParams.get('disc');

    console.log('Name:', productName);
    console.log('Price:', productPrice);
    // Set the initial values when the component mounts
    setProductName(productName);
    setPrice(productPrice);
    setProductId(productId);
    setImage(image);
    setDiscount(disc);
  }, [location.search]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated product data
    const updatedProduct = {
      name: productName,
      price: price,
      disc: discount,
    };

    try {
      // Make the API request to update the product
      const response = await fetch(`https://negari.marketing/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      // Check if the request was successful
      if (response.ok) {
        // Product updated successfully
        console.log('Product updated successfully');
      } else {
        // Handle the failed request
        console.error('Failed to update product');
      }
    } catch (error) {
      // Handle any network or API errors
      console.error('Error:', error);
    }

    // Reset the form fields
    setProductName('');
    setPrice('');
    setDiscount('');
  };

  const handleDelete = async () => {
    try {
      // Make the API request to delete the product
      const response = await fetch(`https://negari.marketing/api/product/${productId}`, {
        method: 'DELETE',
      });

      // Check if the request was successful
      if (response.ok) {
        // Product deleted successfully
        console.log('Product deleted successfully');
      } else {
        // Handle the failed request
        console.error('Failed to delete product');
      }
    } catch (error) {
      // Handle any network or API errors
      console.error('Error:', error);
    }

    // Reset the form fields
    setProductName('');
    setPrice('');
    setDiscount('');
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ backgroundColor: 'var(--tg-theme-bg-color)' }}>

    <div className="mb-3">
      <label className="form-label">Product Logo/Image</label>
      <div className="image__container">
        <img 
          style={{ width: '200px', height: '150px', objectFit: 'cover' }} 
          src={Image} 
          alt="Product"
        />
      </div>
    </div>

      <div className="mb-3">
        <label className="form-label">Product ID:</label>
        <input
           style={{borderRadius:'10px'}}
          type="text"
          className="form-control"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Name:</label>
        <input
          style={{borderRadius:'10px'}}
          type="text"
          className="form-control"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
           style={{borderRadius:'10px'}}
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <input
          style={{borderRadius:'10px'}}
          type="text"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      {/* <div className="mb-3">
        <label className="form-label">Product Image:</label>
        <div className="image__container">
          <img  style={{ width:'100%'}} src={Image} alt="" />
        </div>
      </div> */}
      <div>
        <button  style={{ borderRadius:'10px' , height:'50px' , width:'100%' ,backgroundColor:'green'}} type="submit" className="btn btn-primary">Update Product</button>
        <hr></hr>
        <button style={{ borderRadius:'10px' , height:'50px',width:'100%', backgroundColor:'red'}} type="button" className="btn btn-danger" onClick={handleDelete}>Delete Product</button>
      </div>
    </form>
  );
};

export default UpdateProductForm;