const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)
const plan_ishrane = require('../models/plan_ishrane')(sequelize,Sequelize);
const plan_ishrane_obrok_controller = require('../controller/plan_ishrane_obrok');
const obrok_controller = require('../controller/obrok');
const Op = require('sequelize').Op;

exports.createPlanIshrane = async(newPlanIshrane) =>{
    return await plan_ishrane.create(newPlanIshrane);
}

exports.getSviPlanoviIshrane = async() =>{
    return await plan_ishrane.findAll()
}

exports.getSpecificPlanIshrane = async(id) =>{
    return await plan_ishrane.findOne({
        where:{
            ID:id
        }
    })/*.then((plan_is)=>{
        plan_is.Getobrok();
    })*/
}

exports.getPlanoviIshranePoTreneru = async(trenerID) =>{
    return await plan_ishrane.findAll({
        where:{
            TrenerID: trenerID
        }
    })
    /*.then((plan_is) =>{
        plan_is.Getobrok().then(obroci)
    });*/
}

exports.getPlanoviIshranePoTipu = async(tip_plana) =>{
    return await plan_ishrane.findAll({
        where:{
            Tip:tip_plana
        }
    })
    .then((plan_is) =>{
        plan_is.Getobrok().then(obroci)
    });
}

exports.getVisePlanovaIshrane = async(niz_id) =>{
    return await plan_ishrane.findAll({
        where:{
            ID:{
                [Op.or]:niz_id
            }
        }
    })
}


exports.updatePlanIshraneNaziv = async(naziv, id_plana) =>{
    return await plan_ishrane.update({
        Naziv:naziv
    },{
        where:{
            ID:id_plana
        }
        
    })
}

exports.updatePlanIshraneTip = async(tip, id_plana) =>{
    return await plan_ishrane.update({
        Tip:tip
    },{
        where:{
            ID:id_plana
        }
    })
}

exports.deletePlanIshrane = async(id_plana, nizObrokaID) =>{
    
    return await plan_ishrane_obrok_controller.deleteSvaPojavljivanjaPlana(id_plana).then(async ()=>{
        return await obrok_controller.deleteObrociPoNizu(nizObrokaID).then(async()=>{
            return await plan_ishrane.destroy({
                where:{
                    ID:id_plana
                }
            })
        })
    })
    
    
}

exports.deletePlanIshranePoTreneru = async(trenerID) =>{
    return await plan_ishrane.destroy({
        where:{
            TrenerID:trenerID
        }
    })
}

