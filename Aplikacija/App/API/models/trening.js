const { DataTypes, NOW, Sequelize } = require("sequelize");
//const { now } = require("sequelize/types/lib/utils");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let trening =  sequelize.define('trening',{
    ID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Kod:{
        type:DataTypes.STRING(4),
        unique:true,
        allowNull:false
    },
    ClanID:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Termin:{
        type:DataTypes.STRING(70),
        allowNull:false
    }

},{
    timestamps:false,
    freezeTableName:true,
    tableName:'trening'
})

return trening;
}