const express = require('express');
const { Sequelize } = require('sequelize');
const createPaymentModel = require('./models/paymentModel');
const createPaymentController = require('./controllers/paymentController');
const createPaymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize('payment_db', 'root', 'sapassword', {
  host: 'payment-db',
  dialect: 'mariadb',
});

// Khởi tạo model Payment
const Payment = createPaymentModel(sequelize);

// Cần phải kết nối với Order Service để kiểm tra thông tin đơn hàng
// (Giả sử Order Service có sẵn thông qua API hoặc microservice khác)
const axios = require('axios');
const Order = {
  findByPk: async (id) => {
    try {
      const response = await axios.get(`http://order-service:3002/orders/${id}`);

        return response.data;
    } catch (error) {
      return null;
    }
  },
};

const paymentController = createPaymentController(Payment, Order);
const paymentRoutes = createPaymentRoutes(paymentController);

app.use('/payments', paymentRoutes);

sequelize.sync().then(() => {
  app.listen(3004, () => console.log('Payment Service running on port 3004'));
});
