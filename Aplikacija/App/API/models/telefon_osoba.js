const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) =>{
    let telefon_osoba =  sequelize.define('telefon_osoba',{
    ID:
    {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    osobaID:
    {
        type:DataTypes.INTEGER,
        unique:'compositeOsobaTel',
        allowNull:false
    },
    Telefon:{
        type:DataTypes.STRING(10),
        unique:true,
        unique:'compositeOsobaTel',
        allowNull:false
    }
},
{
    timestamps:false,
    freezeTableName:true,
    tableName:'telefon_osoba'
}
)

return telefon_osoba;
}