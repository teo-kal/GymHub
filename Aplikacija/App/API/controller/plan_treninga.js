const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
const Op = require('sequelize').Op;
//(sequelize,Sequelize)
const plan_treninga = require('../models/plan_treninga')(sequelize,Sequelize);
const plan_treninga_vezba_controller = require('../controller/plan_treninga_vezba');

exports.createPlanTreninga = async(newPlanTreninga) =>{
    return await plan_treninga.create(newPlanTreninga);
}

exports.getSviPlanoviTreninga = async() =>{
    return await plan_treninga.findAll();
}

exports.getSpecificPlanTreninga = async(id) =>{
    return await plan_treninga.findOne({
        where:{
            ID:id
        }
    })
}

exports.getVisePlanovaTreninga = async(niz_id) =>{
    return await plan_treninga.findAll({
        where:{
            ID:{
                [Op.or] : niz_id
            }
        }
    })
}


exports.getPlanoviTreningaPoTreneru = async(trenerID) =>{
    return await plan_treninga.findAll({
        where:{
            TrenerID:trenerID
        }
    })
}

exports.getPlanoviTreningaPoNivou = async(nivo) =>{
    return await plan_treninga.findAll({
        where:{
            Nivo:nivo
        }
    })
}

exports.updatePlanTreningaNivo = async(nivo,id_plana) =>{
    return await plan_treninga.update({
        Nivo:nivo
    },{
        where:{
            ID:id_plana
        }
    })
}

exports.updatePlanTreningaNaziv = async(naziv,id_plana) =>{
    return await plan_treninga.update({
        Naziv:naziv
    },{
        where:{
            ID:id_plana
        }
    })
}

exports.deletePlanoveTreningaPoTreneru = async(trenerID) =>{
    return await plan_treninga.destroy({
        where:{
            TrenerID:trenerID
        }
    })
}

exports.deletePlanTreningaNivo = async(nivo) =>{
    return await plan_treninga.destroy({
        where:{
            Nivo:nivo
        }
    })
}

exports.deletePlanTreningaID = async(id_plana) =>{ //PA OVO


    return await plan_treninga_vezba_controller.deleteSvaPojavljivanjaPlana(id_plana).then(async()=>{
        return await plan_treninga.destroy({
            where:{
                ID:id_plana
            }
        })
    });

    /*return await plan_treninga.destroy({
        where:{
            ID:id_plana
        }
    })*/
}


