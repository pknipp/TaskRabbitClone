'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('JobTypes', [
        {name: "Jester"},
        {name: "Tax Collector"},
        {name: "Cartwright"},
        {name: "Mercenary"},
        {name: "Blacksmith"},
        {name: "Watchman"},
        {name: "Dragon Slayer"},
        {name: "Weaver"},
      ], { fields: ['name']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('JobTypes', null, {});
  }
};
