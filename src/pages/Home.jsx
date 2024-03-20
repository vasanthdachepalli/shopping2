import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import '../styles/ProductCards.css'; // Import CSS file for styling

const ProductCards = (user) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/order');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const filterProducts = (products, searchTerm) => {
    return products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Sellerid.toString().includes(searchTerm) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProducts = filterProducts(products, searchTerm);
 let change1 = ()=>{
   setSearchTerm(user.user)
  }

  const [userType, setUserType] = useState('');
  
    useEffect(() => {
      const fetchUserType = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/user/type', {
            withCredentials: true // Include this option to send cookies with the request
          });
          setUserType(response.data[0].typeofperson);
          console.log(response.data[0].typeofperson);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserType();
    }, []);
  return (
    <div className="product-cards">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {userType === 'seller' &&  <p onClick={change1} >click here to see only your product</p>}
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
                pathname: `/product/${product._id}`,
                state: { product1:product} // Pass product object as state
              }} 
              className="card"
            >
              <img src={product.photo} alt="Product" className="card-image" />
              <div className="card-details">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-cost">${product.cost}</p>
                <div className="tags">
                  <span className="tag">{product.category}</span>
                  <span className="tag">{product.brandName}</span>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCards;
