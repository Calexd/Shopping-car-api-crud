'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      amount: {
        type: Sequelize.STRING(150),
        unique: true,
        defaultValue: 0,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(50)
      },
      voltage: {
        type: Sequelize.STRING(3),
        validate: {
          isIn: {
            args: [['110', '220']],
            msg: "Voltage must be '110' or '220'"
          }
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('products')
  }
};
