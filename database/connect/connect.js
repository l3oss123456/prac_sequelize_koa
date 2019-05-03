const Sequelize = require('sequelize');
// const Model = Sequelize.Model;


const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});


  module.exports = sequelize