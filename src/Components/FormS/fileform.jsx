import React, { useState } from "react";
import"../FormS/fcss";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    // Send POST request to API URL
    fetch("https://api.example.com/products", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
          console.log("Product created successfully");
        } else {
          // Handle error response
          console.error("Failed to create product:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={handleProductNameChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductForm;