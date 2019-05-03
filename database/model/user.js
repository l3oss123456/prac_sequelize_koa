// import Sequelize from 'sequelize'
// import connect from '../connect/connect'
const Sequelize = require('sequelize')
const connect = require('../connect/connect')

const User = connect.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    username: {
      type: Sequelize.STRING,
    },
    password:{
      type: Sequelize.STRING
    }
  }, {
    tableName: 'user'
    // timestamp: false
  })
  module.exports = User;