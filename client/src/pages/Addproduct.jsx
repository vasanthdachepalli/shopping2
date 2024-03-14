/*import React, { useState } from 'react';
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
    console.log(formData)

    try {
        
      const response = await axios.post('http://localhost:8080/upload/', formData, {
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
      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
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

*/


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/add_product.css'; // Import the CSS file for styling



const ProductForm = () => {
 

  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    brandName: '',
    category: '',
    photo: null, // Change to single photo
    cost: '',
    shippingDays: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Only take the first file
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (key === 'photo' && formData[key] !== null) {
        form.append('photo', formData[key]);
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      console.log(form);
      const response = await axios.post('http://localhost:8080/upload/', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response);

      // Navigate to the homepage after successful submission
      window.location.href = '/'; // Assuming '/' is your homepage URL
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Product Description:
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Brand Name:
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Photo (up to 100 KB):
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          {formData.photo && <img src={URL.createObjectURL(formData.photo)} alt="Uploaded" style={{ maxWidth: '100px' }} />}
        </label>
        <label>
          Cost:
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Shipping Days:
          <input
            type="number"
            name="shippingDays"
            value={formData.shippingDays}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
