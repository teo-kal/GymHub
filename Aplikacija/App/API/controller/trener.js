const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)
const trener = require('../models/trener')(sequelize,Sequelize);
const osoba = require('../models/osoba')(sequelize,Sequelize);
const korisnik = require('../models/korisnik')(sequelize,Sequelize);
const soc_mreze = require('../models/socmreza_trener')(sequelize,Sequelize);
const osoba_controller = require('../controller/osoba');
const Op = require('sequelize').Op;

exports.createTrener = async(newTrener) =>{
    return await trener.create(newTrener);
}

exports.getSviTreneri = async() =>{
    return await trener.findAll();
}

exports.getSpecificTrener = async(id) =>{
    return await trener.findOne({
        where:{
            ID:id
        }
    })
}

exports.getViseTrenera = async(niz_id) =>{
    return await trener.findAll({
        where:{
            ID:{[Op.or]:niz_id}
        }
    })
}

exports.getTrenerPoSpecijalizaciji = async(spec) =>{
    return await trener.findOne({
        where:{
            Specijalizacija:spec
        }
    })
}

exports.getTrenerSocMreze = async(idTrenera) =>{
     return await soc_mreze.findAll({
         where:{
             TrenerID:idTrenera
         }
     })
}

exports.updateTrener = async(updatedTrener) =>{

    //Ako bilo sta treba da bude null, pisi null u telu!
    return await trener.update({
        Zvanje:updatedTrener.Zvanje,
        Specijalizacija:updatedTrener.Specijalizacija,
        //GodIskustva:updatedTrener.GodIskustva,
        //DatZaposlenja:updatedTrener.DatZaposlenja,
        //Ocena:updatedTrener.Ocena,
        // BrPersTreninga:updatedTrener.BrPersTreninga,
        // RadnoVreme:updatedTrener.RadnoVreme
    },{
        where:{
            ID:updatedTrener.ID
        }
    })
}

exports.updateTrenerOcena = async(ocena,id_trenera) =>{
    return await trener.update({
        Ocena:ocena
    },{
        where:{
            ID:id_trenera
        }
    })
}

exports.updateTrenerBrPersTreninga = async(br_tren, id_trenera) =>{
    return await trener.update({
        BrPersTreninga:br_tren
    },{
        where:{
            ID:id_trenera
        }
    })
}

exports.deleteTrenerID = async(id_trenera) =>{
    return await trener.destroy({
        where:{
            ID:id_trenera
        }
    }).then(osoba.destroy({
        where:{
            ID:id_trenera
        }
    })).then(korisnik.destroy({
        where:{
            ID:id_trenera
        }
    }))
}


exports.updatePodesavanjaTrener = async(updatedTrener) =>{
    return await trener.update({
        Zvanje: updatedTrener.Zvanje,
        BrPersTreninga : updatedTrener.BrPersTreninga, 
    },{
    where:{
        ID: updatedTrener.ID
    }}
    ).then(async ()=>{
        return await osoba_controller.updateOsobaBrRacuna(updatedTrener.BrRacuna, updatedTrener.ID);
    })
}

