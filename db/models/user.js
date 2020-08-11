'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 80],
          msg: 'Last name must be between 1 and 80 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email must be a valid email'
        },
        len: {
          args: [5, 80],
          msg: 'Email must be between 5 and 80 characters.'}
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      validate: {
        isInt:{
          msg: 'Phone number must include only digits.'
        },
        len: {
          args: [10, 10],
          msg: 'Phone number must include exactly 10 digits'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
