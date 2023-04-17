const { DataTypes, NOW, Sequelize } = require("sequelize");
/*const { now } = require("sequelize/types/lib/utils");
const sequelize = require("../sequelize");*/

module.exports= (sequelize) => {
    let osoba = sequelize.define('osoba',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        JMBG:{
            type:DataTypes.STRING(13),
            unique:true,
            allowNull: false
        },
        Ime:{
            type:DataTypes.STRING(25),
            allowNull: false
        },
        Prezime:{
            type:DataTypes.STRING(25),
            allowNull: false
        },
        DatRodjenja:{
            type:DataTypes.DATE,
            validate:{
                max: Sequelize.NOW - 16
            },
            allowNull:false
        },
        Pol:{
            type:DataTypes.STRING(1),
            validate:{
                isIn:[['M','Z']]
            },
            allowNull:false
        },
        BrRacuna:{
            type: DataTypes.STRING(24),
            unique:true,
            allowNull:true
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName:'osoba'
    })

    return osoba;
}