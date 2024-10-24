document.getElementById('registerBtn').addEventListener('click', () => {
    // Logic to handle shop registration
});

// Function to filter shops based on location
function filterShops(lat, lon, radius) {
    fetch(`/api/shops?lat=${lat}&lon=${lon}&radius=${radius}`)
        .then(response => response.json())
        .then(data => {
            // Display shops in the shopList section
        });
}
