'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasker.belongsTo(models.JobType, {
        foreignKey: "jobTypeId"
      });
      const columnMapping = {
        foreignKey: 'taskerId',
        through: 'Jobs',
        otherKey: 'userId',
      };
      Tasker.belongsToMany(models.User, columnMapping);
    }
  };
  Tasker.init({
    name: DataTypes.STRING,
    skill: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    jobTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasker',
  });
  return Tasker;
};
