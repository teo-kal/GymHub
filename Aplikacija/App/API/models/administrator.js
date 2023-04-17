const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) =>{
    let administrator =  sequelize.define('administrator',{
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        Dostupnost:{
            type: DataTypes.STRING(10),
            validate:{
                isIn:[['Dostupan','Nedostupan','Zauzet']]
            },
            allowNull: true
        }
    },
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'administrator'
       }
)

return administrator;
    }
