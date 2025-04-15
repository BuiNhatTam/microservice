module.exports = (Payment, Order) => ({
  async create(req, res) {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ error: 'Order ID and amount are required' });
    }
  
    console.log('Received orderId:', orderId); // Log orderId for debugging
  
    try {
      // Kiểm tra thông tin đơn hàng từ Order Service
      const order = await Order.findByPk(orderId);
      console.log('Fetched order:', order); // Log the fetched order for debugging
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      if (order.totalAmount !== amount) {
        return res.status(400).json({ error: 'Amount must match the order total amount' });
      }
      // Tạo thanh toán
      const payment = await Payment.create({ orderId, amount });
      res.status(201).json(payment);
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Error processing payment' });
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
        console.error('Error fetching payment:', error);
        res.status(500).json({ error: 'Error fetching payment' });
      }
    },
  });
  