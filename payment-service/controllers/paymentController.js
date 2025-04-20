// controllers/paymentController.js
module.exports = (Payment, Order) => ({
  async create(req, res) {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ error: 'Order ID and amount are required' });
    }

    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      if (order.totalAmount !== amount) {
        return res.status(400).json({ error: 'Amount must match the order total amount' });
      }
      
      const payment = await Payment.create({ orderId, amount });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error processing payment' });
    }
  },

  async getAll(req, res) {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching payments' });
    }
  },

  async getByOrderId(req, res) {
    const { orderId } = req.params;
    try {
      const payment = await Payment.findOne({ where: { orderId } });
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching payment' });
    }
  },
});
