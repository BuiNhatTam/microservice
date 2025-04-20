const axios = require('axios');

module.exports = (Order) => ({
  async create(req, res) {
    const { customerId, productId, quantity } = req.body;
  
    if (!customerId || !productId || !quantity) {
      return res.status(400).json({ error: 'customerId, productId, and quantity are required' });
    }
  
    try {
      // Gọi đến Customer Service
      const customerRes = await axios.get(`http://customer-service:3003/customers/${customerId}`);
      const customerName = customerRes.data.name;
  
      // Gọi đến Product Service
      const productRes = await axios.get(`http://product-service:3001/products/${productId}`);
      const productName = productRes.data.name;
      const price = productRes.data.price;
  
      const totalAmount = price * quantity;
  
      // Gọi đến Inventory Service để trừ kho
      try {
        await axios.post(`http://inventory-service:3005/inventory/update`, {
          productId,
          quantity
        });
      } catch (err) {
        console.error('Inventory error:', err.message);
        return res.status(400).json({ error: 'Sản phẩm không đủ tồn kho hoặc Inventory Service không phản hồi' });
      }
  
      // Tạo đơn hàng
      const order = await Order.create({
        customerId,
        customerName,
        productId,
        productName,
        quantity,
        price,
        totalAmount,
        status: 'pending'
      });
  
      res.status(201).json(order);
    } catch (err) {
      console.error('Error creating order:', err.message);
      res.status(500).json({ error: 'Error creating order' });
    }
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
