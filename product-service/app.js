const express = require('express');
const { Sequelize } = require('sequelize');
const createProductModel = require('./models/product');
const createProductController = require('./controllers/productController');
const createProductRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('product_db', 'root', 'sapassword', {
  host: 'product-db',
  dialect: 'mariadb'
});

const Product = createProductModel(sequelize);
const productController = createProductController(Product);
const productRoutes = createProductRoutes(productController);

app.use('/products', productRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Product Service running on port 3001'));
});
