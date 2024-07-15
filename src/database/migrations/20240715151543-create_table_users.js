'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,

      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt :{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
