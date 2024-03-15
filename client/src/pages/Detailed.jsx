import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/singlepeod.css';

const SingleProduct = (user) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
            productDescription: '',
            brandName: '',
            category: '',
            cost: '',
            shippingDays: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/singleproduct/${id}`);
        setProduct(response.data);

        setFormData({
            productName: product.productName,
             productDescription:product.productDescription,
              brandName: product.brandName,
             category: product.category,
               cost: product.cost,
            shippingDays: product.shippingDays

        })
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = async () => {
    // Add logic to send request to backend for adding to cart
    const response = await axios.post('http://localhost:8080/upload/add/cart/'+id, formData, {
      withCredentials: true,
     
    });
    console.log('Response:', response);


  };

  const handleAddToWishlist = async () => {
    const response = await axios.post('http://localhost:8080/upload/add/wishlist/'+id, formData, {
        withCredentials: true,
       
      });
      console.log('Response:', response);
  };

  


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      
      const response = await axios.post('http://localhost:8080/upload/update/'+id, formData, {
        withCredentials: true,
       
      });
      console.log('Response:', response);

      // Navigate to the homepage after successful submission
     
    } catch (error) {
      console.error('Error:', error);
    }
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
            {user.user !== product.Sellerid &&(
            <div className="action-buttons">
              <button onClick={handleAddToWishlist}>Add to Wishlist</button>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>)};
          </div>

          <div>
            {user.user === product.Sellerid &&(
                <div>
            <p> product edit form(only visible to seller how create ,team delete this thing at time of final evalution,i write this for your understanding) </p>
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
    </div>
)};
          </div>

        </div>

      )}

       
    </div>
  );
};

export default SingleProduct;
