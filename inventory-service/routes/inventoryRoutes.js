// src/routes/inventoryRoutes.js
const express = require('express');
module.exports = (controller) => {
  const router = express.Router();
  router.get('/', controller.getAll); // Lấy tất cả inventory
  router.get('/:productId', controller.getByProductId); // Lấy inventory theo productId
  router.post('/', controller.createInventory); // Thêm mới inventory
  router.post('/update', controller.updateStock); // Cập nhật stock
  return router;
};
