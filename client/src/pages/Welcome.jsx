import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import '../styles/welcome.css'; // Import the CSS file

const FormComponent = () => {
    const [formData, setFormData] = useState({
        nickname: '',
        gender: '',
        typeofperson: '',
        contactNumber: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:8080/api/user/data`, {
                nickname: formData.nickname,
                gender: formData.gender,
                typeofperson: formData.typeofperson,
                contactNumber: formData.contactNumber,
            }, {
              
                withCredentials: true,
            });
    
            if (response.status === 200) {
                // Form submission successful, navigate to home page
                return <Navigate to="/" />;
            } else {
                // Handle error response from server
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error submitting form:', error.message);
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nickname:
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <label>
                        Type of Person:
                        <select
                            name="typeofperson"
                            value={formData.typeofperson}
                            onChange={handleChange}
                        >
                            <option value="">Select Type</option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </label>
                    <label>
                        Contact Number:
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
