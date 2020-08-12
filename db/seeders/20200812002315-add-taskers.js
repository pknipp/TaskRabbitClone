'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Taskers', [
      {name: 'Merek', skill:1, price:18, jobTypeId:3
    },{name: 'Carac', skill:2, price:14, jobTypeId:8
    },{name: 'Ulric', skill:2, price:21, jobTypeId:3
    },{name: 'Tybalt', skill:2, price:36, jobTypeId:7
    },{name: 'Borin', skill:4, price:13, jobTypeId:6
    },{name: 'Sadon', skill:3, price:32, jobTypeId:7
    },{name: 'Terrowin', skill:1, price:10, jobTypeId:8
    },{name: 'Rowan', skill:5, price:28, jobTypeId:5
    },{name: 'Althalos', skill:4, price:55, jobTypeId:5
    },{name: 'Fendrel', skill:3, price:16, jobTypeId:1
    },{name: 'Brom', skill:1, price:7, jobTypeId:1
    },{name: 'Hadrian', skill:4, price:21, jobTypeId:5
    },{name: 'Benedict', skill:1, price:18, jobTypeId:7
    },{name: 'Leofrick', skill:4, price:32, jobTypeId:4
    },{name: 'Lief', skill:2, price:23, jobTypeId:7
    },{name: 'Barda', skill:1, price:7, jobTypeId:7
    },{name: 'Rulf', skill:4, price:33, jobTypeId:6
    },{name: 'Robin', skill:2, price:13, jobTypeId:1
    },{name: 'Gavin', skill:5, price:19, jobTypeId:8
    },{name: 'Terryn', skill:1, price:14, jobTypeId:6
    },{name: 'Jarin', skill:2, price:11, jobTypeId:6
    },{name: 'Cassius', skill:1, price:6, jobTypeId:8
    },{name: 'Leo', skill:1, price:12, jobTypeId:4
    },{name: 'Cedric', skill:3, price:33, jobTypeId:4
    },{name: 'Gavin', skill:3, price:5, jobTypeId:1
    },{name: 'Peyton', skill:5, price:57, jobTypeId:2
    },{name: 'Josef', skill:1, price:9, jobTypeId:4
    },{name: 'Janshai', skill:3, price:10, jobTypeId:1
    },{name: 'Doran', skill:2, price:13, jobTypeId:7
    },{name: 'Asher', skill:2, price:15, jobTypeId:5
    },{name: 'Quinn', skill:5, price:36, jobTypeId:7
    },{name: 'Zane  ', skill:2, price:33, jobTypeId:2
    },{name: 'Xalvador', skill:3, price:15, jobTypeId:1
    },{name: 'Favian', skill:5, price:71, jobTypeId:2
    },{name: 'Destrian', skill:2, price:41, jobTypeId:7
    },{name: 'Dain', skill:1, price:9, jobTypeId:2
    },{name: 'Berinon', skill:3, price:16, jobTypeId:2
    },{name: 'Tristan', skill:4, price:31, jobTypeId:7
    },{name: 'Gorvenal', skill:3, price:31, jobTypeId:3
    },{name: 'Millicent', skill:4, price:18, jobTypeId:4
    },{name: 'Ayleth', skill:2, price:10, jobTypeId:8
    },{name: 'Anastas', skill:5, price:50, jobTypeId:2
    },{name: 'Alianor', skill:4, price:23, jobTypeId:7
    },{name: 'Cedany', skill:3, price:30, jobTypeId:5
    },{name: 'Ellyn', skill:4, price:28, jobTypeId:3
    },{name: 'Helewys', skill:5, price:35, jobTypeId:3
    },{name: 'Malkyn', skill:4, price:7, jobTypeId:8
    },{name: 'Peronell', skill:1, price:7, jobTypeId:2
    },{name: 'Sybbyl', skill:3, price:27, jobTypeId:2
    },{name: 'Ysmay', skill:1, price:10, jobTypeId:5
    },{name: 'Thea', skill:2, price:17, jobTypeId:5
    },{name: 'Jacquelyn', skill:2, price:10, jobTypeId:8
    },{name: 'Gloriana', skill:5, price:12, jobTypeId:6
    },{name: 'Arabella', skill:3, price:15, jobTypeId:1
    },{name: 'Hildegard', skill:2, price:21, jobTypeId:2
    },{name: 'Brunhild', skill:4, price:16, jobTypeId:6
    },{name: 'Adelaide', skill:2, price:23, jobTypeId:4
    },{name: 'Mirabelle', skill:4, price:62, jobTypeId:7
    },{name: 'Guinevere', skill:4, price:39, jobTypeId:4
    },{name: 'Isolde', skill:4, price:72, jobTypeId:7
    },{name: 'Maerwynn', skill:2, price:37, jobTypeId:7
    },{name: 'Muriel', skill:4, price:10, jobTypeId:1
    },{name: 'Winifred', skill:3, price:23, jobTypeId:6
    },{name: 'Godiva', skill:3, price:14, jobTypeId:6
    },{name: 'Catrain', skill:1, price:11, jobTypeId:4
    },{name: 'Angmar', skill:1, price:6, jobTypeId:8
    },{name: 'Gussalen', skill:4, price:39, jobTypeId:2
    },{name: 'Josselyn', skill:3, price:34, jobTypeId:2
    },{name: 'Gwendolynn', skill:2, price:17, jobTypeId:5
    },{name: 'Enndolynn', skill:5, price:12, jobTypeId:8
    },{name: 'Luanda', skill:4, price:26, jobTypeId:5
    },{name: 'Krea', skill:4, price:26, jobTypeId:6
    },{name: 'Rainydayas', skill:3, price:57, jobTypeId:7
    },{name: 'Atheena', skill:1, price:14, jobTypeId:3
    },{name: 'Dimia', skill:2, price:28, jobTypeId:2
    },{name: 'Aleida', skill:3, price:21, jobTypeId:8
    },{name: 'Loreena', skill:4, price:35, jobTypeId:7
    },{name: 'Kaylein', skill:2, price:17, jobTypeId:2
    },{name: 'Seraphina', skill:5, price:24, jobTypeId:8
    },{name: 'Duraina', skill:1, price:17, jobTypeId:4
    },{name: 'Ryia', skill:3, price:49, jobTypeId:7
    },{name: 'Farfelee', skill:4, price:39, jobTypeId:7
    },{name: 'Iseult', skill:4, price:58, jobTypeId:2
    },{name: 'Brangian', skill:2, price:26, jobTypeId:4
    },{name: 'Elspeth', skill:5, price:22, jobTypeId:8}
     ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Taskers', null, {});
  }
};
