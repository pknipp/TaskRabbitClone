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
      Tasker.hasMany(models.Job, {
        foreignKey: "taskerId"
      });
      const columnMapping = {
        foreignKey: 'taskerId',
        through: 'Job',
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
