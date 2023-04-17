//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)


const sequelize = require('../sequelize');
const osoba = require('../models/osoba')(sequelize,Sequelize);
const korisnik = require('../models/korisnik')(sequelize,Sequelize);
const telefon = require('../models/telefon_osoba')(sequelize,Sequelize);
const Op = require('sequelize').Op;
exports.createOsoba = async(newOsoba) =>{
    return await osoba.create(newOsoba);
}

exports.getSveOsobe = async() =>{
    return await osoba.findAll();
}

exports.getSpecificOsoba = async(id) =>{
    return await osoba.findOne({
        where:{
            ID:id
        }
    })
}

exports.getViseOsobaPoID = async(niz_id) =>{
    return await osoba.findAll({
        where:{
            ID:{
                [Op.or] : niz_id
            }
        }
    })
}

exports.getOsobaPoJMBG = async(jmbg) =>{
    return await osoba.findOne({
        where:{
            JMBG:jmbg
        }
    })
}

exports.getOsobaPoRacunu = async(br_racuna) =>{
    return await osoba.findOne({
        where:{
            BrRacuna:br_racuna
        }
    })
}

exports.getBrojTelOsobe = async(id) =>{
    return await telefon.findAll({
        where:{
            osobaID:id
        }
    })
}

exports.getViseTelefonaViseOsoba = async(niz_id) =>{
    return await telefon.findAll({
        where:{
            osobaID:{
                [Op.or] : niz_id
            }
        }
    })
}

exports.updateOsobaIme = async(ime,id_osobe) =>{
    return await osoba.update({
        Ime:ime
    },{
        where:{
            ID:id_osobe
        }
    })
}

exports.updateOsobaPrezime = async(prezime, id_osobe)=>{
    return await osoba.update({
        Prezime:prezime
    },{
        where:{
            ID:id_osobe
        }
    })
}

exports.updateOsobaBrRacuna = async(br_racuna, id_osobe) =>{
    return await osoba.update({
        BrRacuna:br_racuna
    },{
        where:{
            ID:id_osobe
        }
    })
}

exports.updateBrTelefona = async(brTel, ID) =>{

    await telefon.findOne({
        where:{
            osobaID:ID
        }
    }).then(async(osoba)=>{
        if(osoba != null)
        {
            return await telefon.update({
                Telefon:brTel
            },{
                where:{
                    osobaID:ID
                }
            })
        }
        else
        {
            return await telefon.create({osobaID:ID,Telefon:brTel});
        }
    })


  
}

exports.deleteOsoba = async(id_osobe) =>{
    return await osoba.destroy({
        where:{
            ID:id_osobe
        }
    }).then(korisnik.destroy({
        where:{
            ID:id_osobe
        }
    }))
}

exports.deleteOsobaJMBG = async(jmbg) =>{
    return await osoba.destroy({
        where:{
            JMBG:jmbg
        }
    })
}

