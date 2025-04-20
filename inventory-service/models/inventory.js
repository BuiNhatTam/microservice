module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');

  const Inventory = sequelize.define('Inventory', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Inventory;
};
