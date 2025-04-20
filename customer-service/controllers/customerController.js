module.exports = (Customer) => ({
  async create(req, res) {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  },

  async getAll(req, res) {
    const customers = await Customer.findAll();
    res.json(customers);
  },

  async getById(req, res) {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Not found' });
    res.json(customer);
  },

  async update(req, res) {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Not found' });
    await customer.update(req.body);
    res.json(customer);
  },

  async delete(req, res) {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Not found' });
    await customer.destroy();
    res.json({ message: 'Deleted' });
  }
});