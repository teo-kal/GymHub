const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) =>{
    let grupa = sequelize.define('grupa',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        TrenerID: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Termini: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        Naziv: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        Kapacitet: {
            type: DataTypes.INTEGER,
            validate:{
                min:2,
                max:5
            },
            allowNull: false
        },
        PlanTrID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PlanIsId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        TrenutniKap:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'grupa'
    })

    return grupa;
}    