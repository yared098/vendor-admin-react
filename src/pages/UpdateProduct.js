// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';

// function UpdateProduct() {
//   const { productId } = useParams();
//   const history = useHistory();
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');

//   useEffect(() => {
//     axios
//       .get(`http://your-api-endpoint/products/${productId}`)
//       .then((response) => {
//         const { name, price } = response.data;
//         setName(name);
//         setPrice(price);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [productId]);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://your-api-endpoint/products/${productId}`, { name, price })
//       .then((response) => {
//         console.log(response.data);
//         history.push('/show-products');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h2>Update Product</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input type="text" value={price} onChange={handlePriceChange} />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateProduct;