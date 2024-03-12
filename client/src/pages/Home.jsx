import React from 'react'

 const Home = () => {
  return (
    <div>Home</div>
  )
}
export default Home;

/*

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductCards.css'; // Import CSS file for styling

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sellerId.toString().includes(searchTerm) ||
    product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-cards">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {filteredProducts.map((product, index) => (
        <Link
          to={{
            pathname: `/product/${index}`,
            state: { product }
          }}
          key={index}
          className="card-link"
        >
          <div className="card">
            <img src={product.photos[0]} alt="Product" className="card-image" />
            <div className="card-details">
              <h3 className="product-name">{product.productName}</h3>
              <p className="product-cost">${product.cost}</p>
              <div className="tags">
                <span className="tag">{product.categoryName}</span>
                <span className="tag">{product.brandName}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCards;
*/