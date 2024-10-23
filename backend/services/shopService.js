const db = require('../db/config');

exports.createShop = async (name, address, latitude, longitude, ipAddress) => {
  const result = await db.query(
    'INSERT INTO shops (name, address, latitude, longitude, ip_address) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, address, latitude, longitude, ipAddress]
  );
  return result.rows[0].id;
};

exports.findSlots = async (latitude, longitude, distance) => {
  const query = `
    SELECT * FROM slots WHERE 
    ST_Distance_Sphere(
      point(longitude, latitude),
      point($1, $2)
    ) <= $3
  `;
  const result = await db.query(query, [longitude, latitude, distance * 1000]);
  return result.rows;
};
