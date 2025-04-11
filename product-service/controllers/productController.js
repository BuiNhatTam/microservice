module.exports = (Product) => ({
  async create(req, res) {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  },

  async getAll(req, res) {
    const products = await Product.findAll();
    res.json(products);
  },

  async getById(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    await product.update(req.body);
    res.json(product);
  },

  async delete(req, res) {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    await product.destroy();
    res.json({ message: 'Deleted' });
  }
});
