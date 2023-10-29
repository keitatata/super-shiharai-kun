'use strict';
const { faker } = require('@faker-js/faker');

// const _genSeeds = () => {
//   const users = [];
//   for (let i = 0; i < 100; i++) {
//     const date = faker.date.past();
//     users.push({
//       userId: faker.string.uuid(),
//       companyId: faker.string.uuid(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       createdAt: date,
//       updatedAt: date,
//     });
//   }
//   return users;
// };
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
      userId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
      email: 'Stephany_Rogahn@yahoo.com',
      password: 'test',
      createdAt: '2023-08-30 17:41:54',
      updatedAt: '2023-08-30 17:41:54'
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
