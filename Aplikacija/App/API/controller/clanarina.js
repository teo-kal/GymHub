const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
//const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)
const {DataTypes,NOW,Sequelize} = require("sequelize");
const clanarina = require('../models/clanarina')(sequelize,Sequelize);
const Op = require('sequelize').Op;


exports.createClanarina = async(newClanarina) =>{
    return await clanarina.create(newClanarina);
}

exports.getSveClanarine = async()=>{
    return await clanarina.findAll();
}

exports.getClanarinaZaClana = async(id_clana) =>{
    return await clanarina.findOne({
        where:{
            ClanId:id_clana
        }
    })
}

exports.getViseClanarinaPoNizu = async(niz_ID) =>{
    return await clanarina.findAll({
        where:{
            ClanId:{
                [Op.or] : niz_ID
            }
        }
    })
}

exports.updateClanarinaPopust = async(popust, id_clanarine) =>{
    return await clanarina.update({
        Popust:popust
    },{
        where:{
            ClanId:id_clanarine
        }
    })
}

exports.updateClanarinaTip = async(tip,id_clanarine) =>{
    return await clanarina.update({
        Tip:tip
    },{
        where:{
            ClanId:id_clanarine
        }
    })
}


exports.updateClanarinaPeriod = async(period,id_clanarine) =>{
    return await clanarina.update({
        Period:period
    },{
        where:{
            ClanId:id_clanarine
        }
    })
}

exports.updateClanarinaDatumPosPlacanja = async(id_clanarine) =>{
    return await clanarina.update({
        DatPoslednjegPlacanja: new Date(Date.now())
    },{
        where:{
            ClanId:id_clanarine
        }
    })
}

exports.deleteClanarina = async(id_clanarine) =>{
    return await clanarina.destroy({
        where:{
            ClanId:id_clanarine
        }
    })
}