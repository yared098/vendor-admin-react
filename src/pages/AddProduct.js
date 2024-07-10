import React, { useState, useEffect } from "react";
import "../pages/forms.css";

const AddProductForm = ({ telegramId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("All");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [useLocation, setUseLocation] = useState(false);

  useEffect(() => {
    if (useLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setErrorMessage(""); // Clear any previous error messages
          },
          (error) => {
            console.error("Error retrieving location: ", error.message);
            setErrorMessage("Error retrieving location. Please enable location services and try again.");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setErrorMessage("Geolocation is not supported by this browser.");
      }
    }
  }, [useLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!telegramId) {
      setErrorMessage("Telegram ID is null. Cannot upload the product.");
      console.error("Telegram ID is null. Cannot upload the product.");
      return;
    }

    if (!name || !price || !disc || !category) {
      setErrorMessage("Please fill in all required fields.");
      console.error("Please fill in all required fields.");
      return;
    }

    const productData = {
      name,
      price,
      disc,
      image,
      owner: telegramId,
      approved: 0,
      link,
      date_created: new Date().toISOString(),
      category,
      lat: latitude || 0.00,
      lon: longitude || 0.00
    };

    console.log("Submitting product data:", productData);

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
          setLatitude(null);
          setLongitude(null);
          setUseLocation(false); // Reset the checkbox after submission
        } else {
          response.json().then((data) => {
            console.error("Failed to create product:", data);
            setErrorMessage("Failed to create product: " + (data.message || "Unknown error"));
          }).catch(() => {
            setErrorMessage("Failed to create product: Unable to parse error response");
          });
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        setErrorMessage("Error creating product: " + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "var(--tg-theme-bg-color)" }}>
      {telegramId === null && (
        <p className="text-danger">Telegram user ID is null</p>
      )}
      <div className="mb-3">
        <label htmlFor="useLocation">
          Use My Location
          <input
            type="checkbox"
            id="useLocation"
            checked={useLocation}
            onChange={() => setUseLocation(!useLocation)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      {useLocation && latitude && longitude && (
        <div className="mb-3">
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input
          type="text"
          id="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="disc" className="form-label">Description:</label>
        <textarea
          id="disc"
          className="form-control"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image URL:</label>
        <input
          type="text"
          id="image"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
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
          <option value="Book">Book</option>
          <option value="Cars">Cars</option>
          <option value="Home">Home</option>
          <option value="Medical">Medical</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="link" className="form-label">Link:</label>
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
