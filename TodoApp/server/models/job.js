const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
});

module.exports = Job;
