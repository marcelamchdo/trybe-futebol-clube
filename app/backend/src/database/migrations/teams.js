const { DataTypes } = require('sequelize');
 
'use strict'
 
module.exports = {
   up: async (queryInterface, DataTypes) => {
       await queryInterface.createTable('teams', {
           id: {
               autoIncrement: true,
               allowNull: false,
               primaryKey: true,
               type: DataTypes.INTEGER,
           },
           team_name: {
               type: DataTypes.STRING,
               allowNull: false,
           },
       });
   },
 
   down: async (queryInterface) => {
       await queryInterface.dropTable('teams');
   }
};