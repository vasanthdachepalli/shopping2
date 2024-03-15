import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/singlepeod.css';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/singleproduct/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = () => {
    // Add logic to send request to backend for adding to cart
  };

  const handleAddToWishlist = () => {
    
  };
  return (
    <div>
      {product && (
        <div className="single-product-container">
          <div className="product-photo">
            <img src={product.photo} alt={product.productName} style={{ width: '50%', height: '50%' }} />
          </div>
          <div className="product-details">
            <h2>{product.productName}</h2>
            <div className="brand-category">
              <span className="brand-tag">Brand:{product.brandName}</span>
              <span className="category-tag">category:{product.category}</span>
            
            <p>cost: {product.cost}</p>
            <p>maxshippingtime: {product.shippingDays}</p>
            <p>Sellerid: {product.Sellerid}</p>
            </div>
            <div className="product-description">
              <p>{product.productDescription}</p>
            </div>
            <div className="action-buttons">
              <button onClick={handleAddToWishlist}>Add to Wishlist</button>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
