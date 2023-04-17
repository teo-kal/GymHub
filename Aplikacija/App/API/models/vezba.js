const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let vezba =  sequelize.define('vezba',{
    ID:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true
    },
    Naziv:{
        type:DataTypes.STRING(30),
        unique:true,
        allowNull:false
    },
    Opis:{
        type:DataTypes.STRING(1000),
        allowNull:false
    },
    VideoLink:{
        type:DataTypes.STRING(50),
        unique:true,
        allowNull:false
    },
    MisicnaGrupa:{
        type:DataTypes.STRING(20),
        validate:{
            isIn:[['Grudi','Leđa','Ramena','Bicepsi','Tricepsi','Kvadricepsi','Zadnja loža','Listovi','Trbušnjaci','Gluteus']]
        },
        allowNull:false
    }
},
{
    timestamps:false,
    freezeTableName:true,
    tableName:'vezba'
})

return vezba;
}