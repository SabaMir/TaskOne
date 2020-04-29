'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNo: DataTypes.INTEGER,
    addedByadminId: DataTypes.INTEGER
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};