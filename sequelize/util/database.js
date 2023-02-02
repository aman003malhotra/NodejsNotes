const Sequelize = require('sequelize');

// Sequelize(table name, server user, server password)
const sequelize = new Sequelize('noderefresher', 'root', 'aman@1234', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
