module.exports = (Inventory) => {
  return {
    getAll: async (req, res) => {
      const stocks = await Inventory.findAll();
      res.json(stocks);
    },

    getByProductId: async (req, res) => {
      const stock = await Inventory.findOne({ where: { productId: req.params.productId } });
      if (!stock) return res.status(404).json({ message: 'Product not found in inventory' });
      res.json(stock);
    },

    createInventory: async (req, res) => {
      const { productId, quantity } = req.body;
      const existing = await Inventory.findOne({ where: { productId } });
      if (existing) {
        return res.status(400).json({ message: 'Product already exists in inventory' });
      }
      const newStock = await Inventory.create({ productId, quantity });
      res.status(201).json(newStock);
    },
    async updateStock(req, res) {
      const { productId, quantity } = req.body;
    
      let stock = await Inventory.findOne({ where: { productId } });
    
      if (!stock) {
        return res.status(404).json({ message: 'Product not found in inventory' });
      }
    
      if (stock.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
    
      stock.quantity -= quantity;
      await stock.save();
    
      res.json(stock);
    }
  };
};
