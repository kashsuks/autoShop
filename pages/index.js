import React, { useState, useEffect } from 'react';

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
        <div>
            <h1>Auto Shops</h1>
            <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Enter radius in km"
            />
            <button onClick={displayShops}>Find Shops Nearby</button>
            <div id="shop-list">
                {filteredShops.map(shop => (
                    <div key={shop.id}>
                        <h2>{shop.name}</h2>
                        <p>{shop.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
