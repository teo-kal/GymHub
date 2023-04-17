const { DataTypes, NOW, Sequelize } = require("sequelize");
//const { now } = require("sequelize/types/lib/utils");
const sequelize = require("../sequelize");

module.exports = (sequelize) =>{
    let clanarina = sequelize.define('clanarina', {
        ClanId : {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        Tip: {
            type: DataTypes.STRING(10),
            defaultValue:'Undefined',
            validate:{
                isIn:[['Grupni','Samostalni','Personalni','Undefined']]
            },
            allowNull: false
        },
        Period: {
            type: DataTypes.TINYINT,
            defaultValue:1,
            validate:{
                isIn:[[1,6,12]]
            },
            allowNull: false
        },
        Popust: {
            type: DataTypes.DECIMAL(10,0),
            defaultValue:0,
            validate:{
                min: 0.00,
                max: 0.50
            },
            allowNull: false
        },
        DatPoslednjegPlacanja: {
            type: DataTypes.DATE,
            validate:{
                isBefore: Sequelize.NOW
            },
            allowNull: false
        }
        },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'clanarina'
    })

    return clanarina;
}