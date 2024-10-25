import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';

const HomePage = () => {
    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [radius, setRadius] = useState(5); // Default radius in km

    useEffect(() => {
        fetchAutoShops();
    }, []);

    async function fetchAutoShops() {
        const response = await fetch('/api/autoshops');
        const shops = await response.json();
        setShops(shops);
    }

    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        resolve({ latitude, longitude });
                    },
                    error => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error("Geolocation is not supported by this browser."));
            }
        });
    }

    function haversineDistance(coord1, coord2) {
        const toRad = value => (value * Math.PI) / 180;
        const R = 6371; // Radius of the Earth in kilometers

        const dLat = toRad(coord2.latitude - coord1.latitude);
        const dLon = toRad(coord2.longitude - coord1.longitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(coord1.latitude)) * Math.cos(toRad(coord2.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in kilometers
    }

    function filterShopsByRadius(shops, userLocation, radius) {
        return shops.filter(shop => {
            const distance = haversineDistance(userLocation, { latitude: shop.location.latitude, longitude: shop.location.longitude });
            return distance <= radius;
        });
    }

    async function displayShops() {
        try {
            const userLocation = await getUserLocation();
            const filtered = filterShopsByRadius(shops, userLocation, radius);
            setFilteredShops(filtered);
        } catch (error) {
            console.error("Error fetching shops:", error);
        }
    }

    return (
        <Layout>
            <div className="text-center p-4">
                <h1 className="text-3xl font-bold mb-4">Find Auto Shops Near You</h1>
                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Enter radius in km"
                    className="border border-gray-300 rounded p-2 mb-4"
                />
                <Button onClick={displayShops}>Find Shops Nearby</Button>
                <div id="shop-list" className="mt-4">
                    {filteredShops.length > 0 ? (
                        filteredShops.map(shop => (
                            <motion.div 
                                key={shop.id}
                                className="border p-4 rounded-lg shadow-md mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-xl font-semibold">{shop.name}</h2>
                                <p>{shop.description}</p>
                            </motion.div>
                        ))
                    ) : (
                        <p>No shops found within this radius.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
