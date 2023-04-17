const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let obrok =  sequelize.define('obrok',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        Naziv:{
            type:DataTypes.STRING(25),
            allowNull: false
        },
        Tip:{
            type:DataTypes.STRING(20),
            validate:{
                isIn:[['Doručak','Prepodnevna užina','Ručak','Popodnevna užina','Večera']]
            },
            allowNull: false
        },
        Dan:{
            type:DataTypes.STRING(30),
            validate:{
                //isIn:[['PON','UTO','SRE','ČET','PET','SUB','NED',";",":"]]
            },
            allowNull: true
        },
        Sastojci:{
            type:DataTypes.STRING(200),
            allowNull: false
        },
        VrstaObroka:{
            type:DataTypes.STRING(45),
            allowNull: true
        },
        NacinPripreme:{
            type: DataTypes.STRING(750),
            allowNull:false
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'obrok'
    })


    return obrok;
}