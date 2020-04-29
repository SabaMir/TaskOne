'use strict';
module.exports = (sequelize, DataTypes) => {
  const soldMobiles = sequelize.define('soldMobiles', {
    customerId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    billNo: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    details: DataTypes.STRING
  }, {freezeTableName: true,
    underscored: false,
    timestamps:true,
    tableName: 'soldmobiles'});
  soldMobiles.associate = function(models) {
    // associations can be defined here
  };
  return soldMobiles;
};