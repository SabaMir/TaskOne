'use strict';
module.exports = (sequelize, DataTypes) => {
  const shops = sequelize.define('shops', {
    shopName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {freezeTableName: true,
    underscored: false,
    timestamps:true,
    tableName: 'shops'});
  shops.associate = function(models) {
    // associations can be defined here
  };
  return shops;
};