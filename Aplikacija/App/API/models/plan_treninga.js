const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let plan_treninga = sequelize.define('plan_treninga',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        TrenerID:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Naziv:{
            type:DataTypes.STRING(25),
            allowNull: false
        },
        Nivo:{
            type:DataTypes.STRING(8),
            validate:{
                isIn:[['Pocetni','Srednji','Napredni']]
            },
            allowNull: false
        },
        Trajanje:{
            type:DataTypes.INTEGER,
            allowNull: true
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName:'plan_treninga'
    })

    return plan_treninga;
}