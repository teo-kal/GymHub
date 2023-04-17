const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let socmreza_trener =  sequelize.define('socmreza_trener',{
    ID:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    TrenerID:{
        type:DataTypes.INTEGER,
        unique:'compositeSocTrener',
        allowNull: false
    },
    SocMreza: {
        type:DataTypes.STRING(50),
        unique:'compositeSocTrener',
        allowNull:false
    }
},
    {
        timestamps:false,
        freezeTableName:true,
        tableName:'socmreza_trener'
    }
)
    return socmreza_trener;
}