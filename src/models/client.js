const { DataTypes } = require('sequelize')
const conection = require('../database/connections')

const Client = conection.define('clients', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    }, 
    contact: {
        type: DataTypes.STRING,
        allowNull: true   
    }
}, {
    paranoid: true // (deletedAt require if parainoid is true)
})

module.exports = Client
