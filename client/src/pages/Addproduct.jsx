import React, { useState } from 'react';
import axios from 'axios';
import '../styles/add_product.css'; // Import the CSS file for styling
const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [photos, setPhotos] = useState([]);
  const [cost, setCost] = useState('');
  const [shippingDays, setShippingDays] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filesUnderLimit = files.filter(file => file.size <= 100000); // 100 KB limit
    setPhotos(filesUnderLimit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('brandName', brandName);
    formData.append('category', category);
    formData.append('cost', cost);
    formData.append('shippingDays', shippingDays);
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });

    try {
      const response = await axios.post('/api/products', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Description:
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <label>
          Brand Name:
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Photos (up to 100 KB each):
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
          <ul className="photo-list">
            {photos.map((photo, index) => (
              <li key={index}>{photo.name}</li>
            ))}
          </ul>
        </label>
        <label>
          Cost:
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </label>
        <label>
          Shipping Days:
          <input
            type="number"
            value={shippingDays}
            onChange={(e) => setShippingDays(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;