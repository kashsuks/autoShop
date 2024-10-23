import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await axios.get('/shop/slots', {
        params: {
          latitude: 12.9716, // replace with actual user latitude
          longitude: 77.5946, // replace with actual user longitude
          distance: 10, // e.g., 10 km
        },
      });
      setSlots(response.data);
    };

    fetchSlots();
  }, []);

  return (
    <div>
      <h1>Available Repair Slots</h1>
      <ul>
        {slots.map(slot => (
          <li key={slot.id}>
            Shop ID: {slot.shop_id}, Date: {slot.date}, Time: {slot.start_time} - {slot.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
