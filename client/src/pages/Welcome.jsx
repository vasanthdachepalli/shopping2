import React, { useState } from 'react';
import { useHistory, Navigate } from 'react-router-dom';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        nickname: '',
        gender: '',
        typeofperson: '',
        contactNumber: '',
    });

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
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
    );
};

export default FormComponent;