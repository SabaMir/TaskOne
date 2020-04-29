'use strict';
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define('admins', {
    adminName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    shopId: DataTypes.INTEGER
  }, {freezeTableName: true,
    underscored: false,
    timestamps:true,
    tableName: 'admins'});
  admins.associate = function(models) {
    // associations can be defined here
  };
  return admins;
};