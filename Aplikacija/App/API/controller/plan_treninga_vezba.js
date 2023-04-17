const sequelize = require('../sequelize');
//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
const Op = require('sequelize').Op;
//(sequelize,Sequelize)
const plan_treninga_vezba = require('../models/plan_treninga_vezba')(sequelize,Sequelize);

exports.createPlanTreningaVezba = async(newPlanTreningaVezba) =>{
    return await plan_treninga_vezba.create(newPlanTreningaVezba);
}


exports.getSveVezbeZaPlanZaDanas = async(id_plana, dan) =>{
    const dan_check = "%"+dan+"%";
    return await plan_treninga_vezba.findAll({
        where:{
            PlanTrID:id_plana,
            Dani:{[Op.like]:dan_check}
        }
    })
}

exports.getSveVezbeZaPlan = async(id_plana) =>{
    return await plan_treninga_vezba.findAll({
        where:{
            PlanTrID:id_plana
        }
    })
}

exports.deleteSvaPojavljivanjaPlana = async(idPlana) =>{ //OVO IDE PRVO

    return await plan_treninga_vezba.destroy({
        where:{
            PlanTrID:idPlana
        }
    })


}
