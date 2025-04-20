module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Shipping', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    shippedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
