const { DataTypes, NOW } = require("sequelize");
//const { now } = require("sequelize/types/lib/utils");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let trener =  sequelize.define('trener',{
    ID:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    Zvanje:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    Specijalizacija:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    GodIskustva:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    DatZaposlenja:{
        type:DataTypes.DATE,
        validate:{
            isBefore: DataTypes.DATEONLY
        },
        allowNull:false
    },
    Ocena:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        /*validate:{
            min:1.00,
            max:5.00
        }*/
        defaultValue:0
    },
    BrPersTreninga:{
        type:DataTypes.INTEGER,
        validate:{
            min:1.00,
            max:5.00
        },
        allowNull:false
    },
    RadnoVreme:{
        type:DataTypes.STRING(100),
        allowNull:false
    }
},
{
    timestamps:false,
    freezeTableName:true,
    tableName:'trener'
})

return trener;

}