const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");
const obrok = require("./obrok");
const plan_ishrane = require("./plan_ishrane");

module.exports = (sequelize) => {
    let plan_ishrane_obrok =  sequelize.define('plan_ishrane_obrok',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        PlanIsID:{
            type: DataTypes.INTEGER,
            unique: 'compositeIndex',
            references:{
                model:plan_ishrane,
                key:'ID'
            },
            onDelete:'CASCADE',
            allowNull: false
        },
        ObrokID:{
            type:DataTypes.INTEGER,
            unique:'compositeIndex',
            references:{
                model:obrok,
                key:'ID'
            },
            onDelete:'CASCADE',
            allowNull: false
        }
        },
        {
        timestamps:false,
        freezeTableName:true,
        tableName:'plan_ishrane_obrok'
    })

    return plan_ishrane_obrok;
}