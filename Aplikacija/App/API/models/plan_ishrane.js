const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports= (sequelize) => {
    let plan_ishrane = sequelize.define('plan_ishrane',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        TrenerID:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Naziv:{
            type:DataTypes.STRING(25),
            allowNull: false
        },
        Tip:{
            type:DataTypes.STRING(20),
            validate:{
                isIn:[['Svaštojed','Vegan','Vegeterijanac','Pesketerijanac','Dijeta']]
            },
            allowNull: false
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName:'plan_ishrane'

    })

    return plan_ishrane;
}