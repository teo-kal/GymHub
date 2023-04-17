const { DataTypes } = require("sequelize");
//const sequelize = require("../sequelize");

module.exports = (sequelize) => {
    let korisnik =  sequelize.define('korisnik',{
        ID:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        Tip:{
            type: DataTypes.STRING(1),
            validate:{
                isIn:[['A','T','C']]
            },
            allowNull: false
        },
        KorisnickoIme:{
            type: DataTypes.STRING(30),
            unique:true,
            allowNull: false
        },
        Lozinka: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING(50),
            unique:true,
            allowNull: false
        },
        Slika: {
            type: DataTypes.STRING(256),
            allowNull: true
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'korisnik'
    })

    return korisnik;
}