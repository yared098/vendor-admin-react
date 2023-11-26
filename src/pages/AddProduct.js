import React, { useState } from "react";
import "../pages/forms.css";

const AddProductForm = ({ telegramId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("All");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !disc || !category) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const productData = {
      name,
      price,
      disc,
      image,
      owner: telegramId, // Provide a default value for owner here
      approved: 0,
      link,
      data_created: new Date().toString(),
      category,
    };

    fetch("https://negari.marketing/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product created successfully");
          setName("");
          setPrice("");
          setDisc("");
          setImage("");
          setCategory("All");
          setLink("");
          setErrorMessage("");
        } else {
          console.error("Failed to create product:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "var(--tg-theme-bg-color)" }}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          // type="text"
          type="number" 
          step="0.01"
          id="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="disc" className="form-label">
          Description:
        </label>
        <textarea
          id="disc"
          className="form-control"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image url:
        </label>
        <input
          type="text"
          id="image"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          id="category"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Shoe">Shoe</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="link" className="form-label">
          Link:
        </label>
        <input
          type="text"
          id="link"
          className="form-control"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
