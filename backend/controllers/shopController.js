const shopService = require('../services/shopService');

exports.getSlots = async (req, res) => {
  const { latitude, longitude, distance } = req.query;
  try {
    const slots = await shopService.findSlots(latitude, longitude, distance);
    res.json(slots);
  } catch (error) {
    res.status(500).send('Error retrieving slots');
  }
};

exports.registerShop = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  try {
    const shopId = await shopService.createShop(name, address, latitude, longitude, req.ip);
    res.status(201).json({ shopId });
  } catch (error) {
    res.status(500).send('Error registering shop');
  }
};
