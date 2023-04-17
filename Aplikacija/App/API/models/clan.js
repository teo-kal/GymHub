const { DataTypes, NOW, Sequelize } = require("sequelize");
//const { now } = require("sequelize/types/lib/utils");
//const sequelize = require("../sequelize");

module.exports = (sequelize) =>{ 
    let clan = sequelize.define('clan', {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        TrenerID: {
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        GrupaID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Cilj: {
            type: DataTypes.STRING(25),
            validate:{
                isIn:[['Mršavljenje','Održavanje figure','Dobijanje mišićne mase']]
            },
            allowNull: false
        },
        DatUclanjivanja:{
            type: DataTypes.DATE,
            validate:{
                isBefore: Sequelize.NOW
            },
            allowNull: false
        },
        PlanTrId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PlanIsId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Ocenio:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'clan'
    })

    return clan;
}