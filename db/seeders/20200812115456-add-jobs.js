'use strict';
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Jobs', [
      {userId: 1, taskerId: 2, jobDate: '2020-07-29', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 2, jobDate: '2020-09-10', details: faker.lorem.sentence()},
      {userId: 3, taskerId: 8, jobDate: '2020-08-19', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 6, jobDate: '2020-08-10', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 7, jobDate: '2020-07-27', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 7, jobDate: '2020-08-16', details: faker.lorem.sentence()},
      {userId: 3, taskerId: 2, jobDate: '2020-07-21', details: faker.lorem.sentence()},
      {userId: 3, taskerId: 5, jobDate: '2020-09-13', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 2, jobDate: '2020-08-10', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 6, jobDate: '2020-08-21', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 6, jobDate: '2020-08-11', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 2, jobDate: '2020-07-16', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 2, jobDate: '2020-07-20', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 3, jobDate: '2020-08-10', details: faker.lorem.sentence()},
      {userId: 3, taskerId: 8, jobDate: '2020-08-30', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 3, jobDate: '2020-07-25', details: faker.lorem.sentence()},
      {userId: 2, taskerId: 3, jobDate: '2020-08-25', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 2, jobDate: '2020-07-26', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 4, jobDate: '2020-08-28', details: faker.lorem.sentence()},
      {userId: 3, taskerId: 2, jobDate: '2020-07-29', details: faker.lorem.sentence()},
      {userId: 1, taskerId: 6, jobDate: '2020-07-28', details: faker.lorem.sentence()},
    ], {fields: ['userId', 'taskerId', 'jobDate', 'details']});
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Jobs', null, {});
  }
};
