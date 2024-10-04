// create a sequelize model for t_login table in database



const {DataTypes} = require('sequelize');
const sequelize = require('../DB/db.js');

const Login = sequelize.define('Login', {
    f_sno:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    f_username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Pwd: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, 
{
    timestamps: false,
    tableName: 't_login'
});

Login.sync()
module.exports = Login