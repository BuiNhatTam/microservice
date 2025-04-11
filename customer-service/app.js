const express = require('express');
const { Sequelize } = require('sequelize');
const createCustomerModel = require('./models/customer');
const createCustomerController = require('./controllers/customerController');
const createCustomerRoutes = require('./routes/customerRoutes'); // ✅ Đổi tên hàm cho đúng

const app = express();
app.use(express.json());

const sequelize = new Sequelize('customer_db', 'root', 'sapassword', {
  host: 'customer-db',
  dialect: 'mariadb'
});

const Customer = createCustomerModel(sequelize);
const customerController = createCustomerController(Customer);
const customerRoutes = createCustomerRoutes(customerController);

app.use('/customers', customerRoutes);

sequelize.sync().then(() => {
  app.listen(3003, () => console.log('Customer Service running on port 3003'));
});