'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {firstName: "John", lastName: "Doe",email:"johndoe@aol.com",phone:1234567890, hashedPassword: bcrypt.hashSync('password', 10)},
      {firstName: "Demo", lastName: "User",email: 'demo@user.io',phone:3456789012, hashedPassword: bcrypt.hashSync('password', 10)},
      {firstName: "God",  lastName: "Thor",email:"thor@aol.com",phone:2345678901, hashedPassword: bcrypt.hashSync('password', 10)}
  ], { fields: ['firstName', 'lastName', 'email', 'phone', 'hashedPassword']});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
