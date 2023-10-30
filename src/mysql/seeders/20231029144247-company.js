'use strict';
// const { faker } = require('@faker-js/faker');

// const _genSeeds = () => {
//   const companies = [];
//   for (let i = 0; i < 100; i++) {
//     const date = faker.date.past();
//     companies.push({
//       companyId: faker.string.uuid(),
//       name: faker.company.name(),
//       representativeName: faker.internet.userName(),
//       phone: faker.phone.number(),
//       postCode: faker.location.zipCode(),
//       address: faker.location.streetAddress(),
//       createdAt: date,
//       updatedAt: date,
//     });
//   }
//   return companies;
// };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Companies', [{
      companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
      name: 'test',
      representativeName: 'test',
      phone: '00000000000',
      postCode: 'test',
      address: 'test',
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
