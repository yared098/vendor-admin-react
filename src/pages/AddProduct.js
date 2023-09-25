import React, { useState } from "react";
import "../pages/forms.css"

const AddProductForm = ({ telegramId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  const [link, setLink] = useState("");

  const currentDate = new Date();

  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 since January is represented as 0
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = String(currentDate.getFullYear());

  const formattedString = `${month}/${seconds}/${minutes}/${hours}/${day}/${year}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      disc,
      image,
      owner: telegramId,
      approved: 0,
      link:"https://negari.marketing/api/product/",
      data_created:new Date().toString(),
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
          // Reset form fields after successful submission
          setName("");
          setPrice("");
          setDisc("");
          setImage("");
          setOwner("");
          setLink("");
        } else {
          console.error("Failed to create product:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--tg-theme-bg-color)' }} >
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
        <label htmlFor="image" className="form-label">Image url:</label>
        <input
          type="text"
          id="image"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="owner" className="form-label">Owner:</label>
        <input
          type="text"
          id="owner"
          className="form-control"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
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
      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
};


export default AddProductForm;

// import React, { useState } from "react";

// const AddProductForm = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [disc, setDisc] = useState("");
//   const [image, setImage] = useState(null);
//   const [owner, setOwner] = useState("");
//   const [link, setLink] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const productData = new FormData();
//     productData.append("name", name);
//     productData.append("price", price);
//     productData.append("disc", disc);
//     productData.append("image", image);
//     productData.append("owner", owner);
//     productData.append("approved", 0);
//     productData.append("link", link);
//     productData.append("data_created", new Date().toISOString());

//     fetch("https://negari.marketing/api/product/", {
//       method: "POST",
//       body: productData,
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log("Product created successfully");
//           // Reset form fields after successful submission
//           setName("");
//           setPrice("");
//           setDisc("");
//           setImage(null);
//           setOwner("");
//           setLink("");
//         } else {
//           console.error("Failed to create product:", response.status);
//         }
//       })
//       .catch((error) => {
//         console.error("Error creating product:", error);
//       });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Price:
//         <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Description:
//         <textarea value={disc} onChange={(e) => setDisc(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Image:
//         <input type="file" onChange={handleImageChange} />
//       </label>
//       <br />
//       <label>
//         Owner:
//         <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Link:
//         <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
//       </label>
//       <br />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// };

// export default AddProductForm;