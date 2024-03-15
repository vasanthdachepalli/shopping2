import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import '../styles/ProductCards.css'; // Import CSS file for styling

const ProductCards = (user) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/order/wishlist', {
          withCredentials: true // Include this option to send cookies with the request
        });
        console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
   

    fetchData();
  }, []);

  const filterProducts = (products, searchTerm) => {
    return products.filter(product =>
      product.data.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.data.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.data.Sellerid.toString().includes(searchTerm) ||
      product.data.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProducts = filterProducts(products, searchTerm);
 let deleter = async (product) =>{
    try {
        const response = await axios.get('http://localhost:8080/api/wish/delete/'+ product.data._id, {
            withCredentials: true // Include this option to send cookies with the request
          });
          console.log(response);
        fetchData();
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
 }

  
  return (
    <div className="product-cards">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    
      {products === null ? (
        <div className="error-message">Error fetching products. Please try again later.</div>
      ) : (
        filteredProducts.map((product, index) => (
          <div
            key={index}
            className="card-link"
          >
            <Link 
              to={{ 
                pathname: `/product/${product.data._id}`,
                state: { product1:product} // Pass product object as state
              }} 
              className="card"
            >
              <img src={product.data.photo} alt="Product" className="card-image" />
              <div className="card-details">
                <h3 className="product-name">{product.data.productName}</h3>
                <p className="product-cost">${product.data.cost}</p>
                <div className="tags">
                  <span className="tag">{product.data.category}</span>
                  <span className="tag">{product.data.brandName}</span>
                </div>
                
              </div>
            </Link>
            <div onClick={() => deleter(product)}>Delete from wishlist</div>

          </div>
        ))
      )}
    </div>
  );
};

export default ProductCards;
