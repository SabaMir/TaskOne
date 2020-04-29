'use strict';
module.exports = (sequelize, DataTypes) => {
  const logs = sequelize.define('logs', {
    adminName: DataTypes.STRING,
    adminId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    shopId: DataTypes.INTEGER
  }, {});
  logs.associate = function(models) {
    // associations can be defined here
  };
  return logs;
};