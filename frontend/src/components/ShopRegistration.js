import React, { useState } from 'react';
import axios from 'axios';

const ShopRegistration = () => {
  const [shopData, setShopData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/shop/register', shopData);
    alert('Shop registered successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register Your Shop</h1>
      <input type="text" name="name" placeholder="Shop Name" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} required />
      <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default ShopRegistration;
