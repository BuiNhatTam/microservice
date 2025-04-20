// routes/paymentRoutes.js
const express = require('express');
module.exports = (controller) => {
  const router = express.Router();

  // Route tạo thanh toán mới
  router.post('/', controller.create);

  // Route lấy tất cả các khoản thanh toán
  router.get('/', controller.getAll);  // Thêm route này

  // Route lấy thông tin thanh toán theo Order ID
  router.get('/:orderId', controller.getByOrderId);

  return router;
};