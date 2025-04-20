const express = require('express');
module.exports = (controller) => {
  const router = express.Router();

  router.post('/', controller.create);
  router.get('/', controller.getAll);
  router.get('/:orderId', controller.getByOrderId);
  router.put('/:orderId/status', controller.updateStatus);

  return router;
};
