//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
const Op = require('sequelize').Op;
//(sequelize,Sequelize)


const sequelize = require('../sequelize');
const obrok = require('../models/obrok')(sequelize,Sequelize);

exports.createObrok = async(newObrok) =>{
    return await obrok.create(newObrok);
}

exports.getSviObroci = async() =>{
    return await obrok.findAll();
}

exports.getObrokPoNazivu = async(naziv) =>{
    return await obrok.findAll({
        where:{
            Naziv:naziv
        }
    })
}



exports.getSviObrociPoVrstiTipu = async(tip_obroka, vrsta) =>{
    console.log(tip_obroka);
    return await obrok.findAll({
        where:{
            Tip:tip_obroka.toString(),
            VrstaObroka:vrsta
        }
    })
}

exports.getSviObrociPoTipu = async(tip)=>{
    return await obrok.findAll({
        where:{
            Tip:tip
        }
    })
    
}

exports.getSviObrociPoDanu = async(dan_obroka) =>{
    return await obrok.findAll({
        where:{
            Dan:dan_obroka
        }
    })
}

exports.getViseObrokaNiz = async(niz_id)=>{
    return await obrok.findAll({
        where:{
            ID:{
                [Op.or]:niz_id
            }
        }
    })
}


exports.updateObrok = async(newObrok) =>{
    return await obrok.update({
        Naziv:newObrok.Naziv,
        Tip:newObrok.Tip,
        Dan:newObrok.Dan,
        Sastojci: newObrok.Sastojci,
        NacinPripreme:newObrok.NacinPripreme
    },{
        where:{
            ID:newObrok.ID
        }
    })
}

exports.updateObrokTip = async(updatedTip, id_obrok) =>{
    return await obrok.update({
        Tip:updatedTip
    },{
        where:{
            ID:id_obrok
        }
    })
}

exports.updateObrokPriprema = async(updatedNacin, id_obrok) =>{
    return await obrok.update({
        NacinPripreme:updatedNacin
    },{
        where:{
            ID:id_obrok
        }
    })
}

exports.deleteObrok = async(id_obrok) =>{
    return await obrok.destroy({
        where:{
            ID:id_obrok
        }
    })
}

exports.deleteObrociPoTipu = async(tip) =>{
    return await obrok.destroy({
        where:{
            Tip:tip
        }
    })
}

exports.deleteObrociPoDanu = async(dan) =>{
    return await obrok.destroy({
        where:{
            Dan:dan
        }
    })
}

exports.deleteObrociPoNizu = async(nizObrokaID) => {
    return await obrok.destroy({
        where:{
            ID:{
                [Op.or]:nizObrokaID
            }
        }
    })
}

