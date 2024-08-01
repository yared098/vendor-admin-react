
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/forms.css";
import axios from 'axios';

const AddProductForm = ({ telegramId }) => {
  const [isuploaded, setUploaded] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("All");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [useLocation, setUseLocation] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Added state for image preview
  const navigate = useNavigate();
  

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
            setLatitude(0.00);
            setLongitude(0.00)
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

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview URL for the selected image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploaded(true);

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

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('disc', disc);
    formData.append('owner', telegramId);
    formData.append('approved', 0);
    formData.append('link', link);
    formData.append('date_created', new Date().toString());
    formData.append('category', category);
    formData.append('lat', latitude || 0.00);
    formData.append('lon', longitude || 0.00);

    try {
      const response = await axios.post("https://negari.marketing/api/product/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        console.log("Product created successfully");
        setName("");
        setPrice("");
        setDisc("");
        setImage(null);
        setCategory("All");
        setLink("");
        setErrorMessage("");
        setLatitude(null);
        setLongitude(null);
        setUseLocation(false); // Reset the checkbox after submission
        navigate('/')
        setUploaded(false);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage("Error creating product: " + error.message);
    }
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
        style={{borderRadius:'10px'}}
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
         style={{borderRadius:'10px'}}
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
         style={{borderRadius:'10px'}}
          id="disc"
          className="form-control"
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Image:</label>
        <input
         style={{borderRadius:'10px'}}
          type="file"
          id="image"
          className="form-control"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-3">
            <img
            
              src={imagePreview}
              alt="" // Empty alt attribute for decorative images
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
        )}

      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
         style={{borderRadius:'10px'}}
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
        <label htmlFor="link" className="form-label">If You have Link:</label>
        <input
         style={{borderRadius:'10px'}}
          type="text"
          id="link"
          className="form-control"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <button
        style={{
          borderRadius: '10px',
          width: '100%',
          backgroundColor: 'green',
          textAlign: 'center',
          height: '50px',
        }}
        type="submit"
        className="btn btn-primary"
      >
        {isuploaded ? 'Add product' : 'Uploading..'}
      </button>

    </form>
  );
};

export default AddProductForm;
