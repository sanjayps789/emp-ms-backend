const {DataTypes} = require('sequelize');
const sequelize = require('../DB/db.js');

const Employee = sequelize.define('Employee', {
    f_Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    f_Image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    f_Mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    f_gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    f_Course:{
        type: DataTypes.STRING,
        allowNull: false
    },
    f_CreateDate:{
        // get the date only
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE()
    },
    f_status:{
        type: DataTypes.STRING,
        defaultValue: 'Active'
    }
},
{
    timestamps: false,
    tableName: 't_employee'
})

Employee.sync()

module.exports = Employee