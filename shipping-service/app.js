const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const createModel = require('./models/shipping');
const createController = require('./controllers/shippingController');
const createRoutes = require('./routes/shippingRoutes');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('shipping_db', 'root', 'sapassword', {
  host: 'shipping-db', // Đây là tên của service MariaDB trong docker-compose.yml
  dialect: 'mariadb'
});
const Shipping = createModel(sequelize, DataTypes);
const controller = createController(Shipping);
const routes = createRoutes(controller);
app.use('/shipping', routes);

sequelize.sync().then(() => {
  app.listen(3006, () => console.log('Shipping Service running on port 3006'));
});
