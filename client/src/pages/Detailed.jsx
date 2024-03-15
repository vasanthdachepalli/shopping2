import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const SingleProduct = () => {
  // Access the location object
  const { id } = useParams();
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/singleproduct/'+id);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  // Render the component
  return (
    <div>
      <h2>Single Product</h2>
     
    </div>
  );
};

export default SingleProduct;
