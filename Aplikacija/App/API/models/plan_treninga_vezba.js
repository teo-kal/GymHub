const { DataTypes } = require("sequelize");
//const { databaseVersion } = require("../sequelize");
//const sequelize = require("../sequelize");
const plan_treninga = require("./plan_treninga");
const vezba = require('./vezba');

module.exports  = (sequelize) => {
    let plan_treninga_vezba =  sequelize.define('plan_treninga_vezba',{
        ID:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        PlanTrID:{
            type:DataTypes.INTEGER,
            unique: 'compositeTreningVezba',
            references:{
                model:plan_treninga,
                key:'ID'
            },
            onDelete:'CASCADE',
            allowNull: false
        },
        VezbaID:{
            type:DataTypes.INTEGER,
            unique:'compositeTreningVezba',
            references:{
                model:vezba,
                key:'ID'
            },
            onDelete:'CASCADE',
            allowNull: false
        },
        BrSerija:{
            type:DataTypes.INTEGER,
            validate:{
                min:1,
                max:10
            },
            allowNull: true
        },
        BrPonavljanja:{
            type:DataTypes.INTEGER,
            validate:{
                min:1,
                max:50
            },
            allowNull: true
        },
        BrSekundi:{
            type:DataTypes.INTEGER,
            validate:{
                min:1,
                max:300
            },
            allowNull: true
        },
        Dani:{  //OVO JE JEDNINAAA!
            type:DataTypes.STRING(50),
            allowNull:false
        },
        RBrVezbe:{
            type:DataTypes.TINYINT,
            allowNull: false
        }
        },
        {
        timestamps:false,
        freezeTableName: true,
        tableName:'plan_treninga_vezba'
    })

    return plan_treninga_vezba;
}