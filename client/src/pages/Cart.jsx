import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/cart.css';

const ProductCards = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/order/cart', {
        withCredentials: true
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotalCost = () => {
    return products.reduce((total, product) => total + product.data.cost, 0);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/delete/${productId}`, {
        withCredentials: true
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Checkout clicked');
    // Implement checkout logic here
  };

  return (
    <div className="product-cards-container">
      {products === null ? (
        <div className="error-message">Error fetching products. Please try again later.</div>
      ) : (
        <div>
          <div className="cards-container">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <Link to={{ pathname: `/product/${product.data._id}`, state: { product1: product } }}>
                  <img src={product.data.photo} alt="Product" className="card-image" />
                </Link>
                <div className="card-details">
                  <h3 className="product-name">{product.data.productName}</h3>
                  <p className="product-cost">${product.data.cost}</p>
                  <div className="tags">
                    <span className="tag">{product.data.category}</span>
                    <span className="tag">{product.data.brandName}</span>
                  </div>
                </div>
                <div className="delete-button" onClick={() => deleteProduct(product.data._id)}>Delete from Cart</div>
              </div>
            ))}
          </div>
          <div className="total-cost">Total Cost: ${calculateTotalCost()}</div>
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
