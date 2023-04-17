
const {Sequelize} = require('sequelize');
const sequelize = require('../sequelize');
const vezba = require('../models/vezba')(sequelize,Sequelize);
const Op = require('sequelize').Op;

exports.createVezba = async(newVezba) =>{
    return await vezba.create(newVezba);
}

exports.getSveVezbe = async() =>{
    return await vezba.findAll();
}

exports.getSpecificVezba = async(id) =>{
    return await vezba.findOne({
        where:{
            ID:id
        }
    })
}

exports.getViseVezbiPoPlanu = async(niz_id) =>{
    return await vezba.findAll({
        where:{
            ID:{
                [Op.or] : niz_id
            }
        }
    })
}

exports.getVezbePoMisicu = async(misicna_grupa) =>{
    return await vezba.findAll({
        where:{
            MisicnaGrupa: misicna_grupa
        }
    })
}

exports.getVezbaPoNazivu = async(naziv) =>{
    return await vezba.findAll({
        where:{
            Naziv:naziv
        }
    })
}

exports.updateVezbaOpis = async(opis,id_vezbe) =>{
    return await vezba.update({
        Opis:opis
    },{
        ID:id_vezbe
    })
}

exports.updateVezbaLink = async(link,id_vezbe) =>{
    return await vezba.update({
        VideoLink:link
    },{
        ID:id_vezbe
    })
}

exports.deleteVezbaID = async(id_vezbe) =>{
    return await vezba.destroy({
        where:{
            ID:id_vezbe
        }
    })
}


