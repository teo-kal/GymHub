const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)
const trening = require('../models/trening')(sequelize,Sequelize);
const Op = require('sequelize').Op;

exports.createTrening = async(newTrening) =>{
    return await trening.create(newTrening);
}

exports.getSviTreninzi = async() =>{
    return await trening.findAll();
}

exports.getTreningPoKodu = async(kod) =>{
    return await trening.findOne({
        where:{
            Kod:kod
        }
    })
}

exports.getTreningPoID = async(id_treninga) =>{
    return await trening.findOne({
        where:{
            ID:id_treninga
        }
    })
}

exports.getSviTreninziPoTerminu = async(termin) =>{
    return await trening.findAll({
        where:{
            Termin:termin
        }
    })
}

exports.getTreningPoClanu = async(clan_id) =>{
    return await trening.findOne({
        where:{
            ClanID:clan_id
        }
    })
}

exports.getSviTreninziZaClanove = async(niz_id_clanova)=>{
    return await trening.findAll({
        where:{
            ClanID:{
                [Op.or] : niz_id_clanova
            }
        }
    })
}

exports.deleteTreningPoKodu = async(kod) =>{
    return await trening.destroy({
        where:{
            Kod:kod
        }
    })
}

exports.deleteTreningPoID = async(id_treninga) =>{
    return await trening.destroy({
        where:{
            ID:id_treninga
        }
    })
}

exports.deleteTreningPoClanu = async(id_clana) =>{
    return await trening.destroy({
        where:{
            ClanID:id_clana
        }
    })
}

