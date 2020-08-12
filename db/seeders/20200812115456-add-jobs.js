'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Jobs', [
      {userId:2,taskerId:1,jobDate:2020-08-21 19:33:39.939737-04,details:'write random details here'},
      {userId:3,taskerId:4,jobDate:2020-08-31 10:19:30.781887-04,details:'write random details here'},
      {userId:3,taskerId:7,jobDate:2020-08-14 14:34:32.472377-02,details:'write random details here'},
      {userId:3,taskerId:4,jobDate:2020-08-10 18:30:49.626173-04,details:'write random details here'},
      {userId:2,taskerId:6,jobDate:2020-08-19 14:32:55.827774-02,details:'write random details here'},
      {userId:2,taskerId:8,jobDate:2020-08-16 15:52:43.583438-02,details:'write random details here'},
      {userId:3,taskerId:2,jobDate:2020-08-18 14:32:53.701413-03,details:'write random details here'},
      {userId:2,taskerId:4,jobDate:2020-08-13 12:20:13.627199-03,details:'write random details here'},
      {userId:1,taskerId:3,jobDate:2020-08-25 21:15:40.725169-04,details:'write random details here'},
      {userId:2,taskerId:3,jobDate:2020-08-26 20:31:50.885999-03,details:'write random details here'},
      {userId:3,taskerId:3,jobDate:2020-08-20 18:14:52.441635-02,details:'write random details here'},
      {userId:1,taskerId:4,jobDate:2020-08-21 15:58:40.599220-04,details:'write random details here'},
      {userId:1,taskerId:3,jobDate:2020-08-22 15:32:21.802429-03,details:'write random details here'},
      {userId:2,taskerId:2,jobDate:2020-08-12 20:45:14.546510-03,details:'write random details here'},
      {userId:3,taskerId:5,jobDate:2020-08-21 14:33:10.104234-03,details:'write random details here'},
      {userId:2,taskerId:8,jobDate:2020-08-27 20:38:20.692678-03,details:'write random details here'},
      {userId:2,taskerId:7,jobDate:2020-08-20 11:32:26.393629-04,details:'write random details here'},
      {userId:2,taskerId:5,jobDate:2020-08-19 12:46:53.332124-04,details:'write random details here'},
      {userId:3,taskerId:2,jobDate:2020-08-27 13:15:37.331649-04,details:'write random details here'},
      {userId:1,taskerId:8,jobDate:2020-08-22 19:34:56.770450-01,details:'write random details here'},
      {userId:2,taskerId:4,jobDate:2020-08-13 20:18:11.457550-02,details:'write random details here'},
    ], {fields: ['userId', 'taskerId', 'jobDate', 'details']});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Jobs', null, {});
  }
};
