'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Books', [
       {
      title: 'Mr. X',
      isbn: '12345678992',
      price: 100000,
      stock: 10,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        title: 'Mr. Y',
        isbn: '12345678982',
        price: 1000000,
        stock: 15,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    {
      title: 'Mr. R',
        isbn: '12345678983',
        price: 10000,
        stock: 20,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
      title: 'Mr. Z',
      isbn: '12345678984',
      price: 1000000,
      stock: 30,
      authorId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
      

    ], {});
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
