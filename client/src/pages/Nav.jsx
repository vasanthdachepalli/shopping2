import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css'; // Import the CSS file for styling
const Navbar = () => {
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
   const logout = async function(){
    window.open(`http://localhost:8080/auth/logout`, "_self");
   }
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="shopping-life">Shopping Life</h1>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
            {userType === 'seller' && <li><Link to="/addproduct">Add a Product</Link></li>}
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li className="dropdown">
              <span className="dropdown-btn">Profile</span>
              <div className="dropdown-content">
                <Link to="/mypurchases">My Purchases</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/preferences">Preferences</Link>
                {userType === 'seller' && <Link to="/myorders">My Orders</Link>}
                <div onClick={logout}>logout</div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;