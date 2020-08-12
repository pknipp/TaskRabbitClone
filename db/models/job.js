'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.belongsTo(models.User,   {foreignKey: "userId"  });
      Job.belongsTo(models.Tasker, {foreignKey: "taskerId"});
    }
  };
  Job.init({
    userId: DataTypes.INTEGER,
    taskerId: DataTypes.INTEGER,
    jobDate: DataTypes.DATE,
    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
