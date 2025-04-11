
module.exports = (Order) => ({
  async create(req, res) {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  },

  async getAll(req, res) {
    const orders = await Order.findAll();
    res.json(orders);
  },

  async getById(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    res.json(order);
  },

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    await order.update(req.body);
    res.json(order);
  },

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    await order.destroy();
    res.json({ message: 'Deleted' });
  }
});