// src/app.js
const express = require('express');
const { Sequelize } = require('sequelize');
const createModel = require('./models/inventory');
const createController = require('./controllers/inventoryController');
const createRoutes = require('./routes/inventoryRoutes');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('inventory_db', 'root', 'sapassword', {
  host: 'inventory-db',
  dialect: 'mariadb'
});
// Kiểm tra kết nối tới database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const Inventory = createModel(sequelize);
const controller = createController(Inventory); 
const routes = createRoutes(controller);
app.use('/inventory', routes);

// Đồng bộ hóa các model và khởi động server
sequelize.sync()
  .then(() => {
    app.listen(3005, () => console.log('Inventory Service running on port 3005'));
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });