const express = require('express');
const { Sequelize } = require('sequelize');
const createOrderModel = require('./models/order');
const createOrderController = require('./controllers/orderController');
const createOrderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('order_db', 'root', 'sapassword', {
  host: 'order-db',
  dialect: 'mariadb'
});

const Order = createOrderModel(sequelize);
const orderController = createOrderController(Order);
const orderRoutes = createOrderRoutes(orderController);

app.use('/orders', orderRoutes);

sequelize.sync().then(() => {
  app.listen(3002, () => console.log('Order Service running on port 3002'));
});