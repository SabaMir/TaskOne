'use strict';
module.exports = (sequelize, DataTypes) => {
  const mobiles = sequelize.define('mobiles', {
    mobileName: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    mobileModel: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    billNo: DataTypes.INTEGER
  }, {});
  mobiles.associate = function(models) {
    // associations can be defined here
  };
  return mobiles;
};