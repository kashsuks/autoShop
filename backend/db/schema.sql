CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL NOT NULL,
    longitude DECIMAL NOT NULL,
    ip_address VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS slots (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    date DATE NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE
);
