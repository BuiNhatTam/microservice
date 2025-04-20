module.exports = (Shipping) => ({
  async create(req, res) {
    const { orderId, address } = req.body;
    try {
      const shipping = await Shipping.create({ orderId, address });
      res.status(201).json(shipping);
    } catch (err) {
      res.status(500).json({ error: 'Cannot create shipping' });
    }
  },

  async getAll(req, res) {
    const all = await Shipping.findAll();
    res.json(all);
  },

  async getByOrderId(req, res) {
    const ship = await Shipping.findOne({ where: { orderId: req.params.orderId } });
    if (!ship) return res.status(404).json({ error: 'Not found' });
    res.json(ship);
  },

  async updateStatus(req, res) {
    const ship = await Shipping.findOne({ where: { orderId: req.params.orderId } });
    if (!ship) return res.status(404).json({ error: 'Not found' });

    ship.status = req.body.status || ship.status;
    if (req.body.status === 'shipped') ship.shippedAt = new Date();
    await ship.save();
    res.json(ship);
  }
});
