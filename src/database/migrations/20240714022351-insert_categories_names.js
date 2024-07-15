'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('categories',[
      { name: 'Eletrônicos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Móveis', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Roupas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Livros', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Brinquedos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alimentos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Esportes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beleza', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Automotivo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Música', createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
