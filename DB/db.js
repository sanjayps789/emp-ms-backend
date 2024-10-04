const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('employeeMS', 'postgres', 'sanjayps', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Postgres connected Successfully!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize
