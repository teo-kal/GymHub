const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)


const plan_ishrane_obrok = require('../models/plan_ishrane_obrok')(sequelize,Sequelize);
const plan_ishrane = require('../models/plan_ishrane')(sequelize,Sequelize);
const obrok = require('../models/obrok')(sequelize,Sequelize);
const Op = require('sequelize').Op;

exports.createPlanIshraneObrok = async(newPlanIshraneObrok) =>{
    return await plan_ishrane_obrok.create(newPlanIshraneObrok);
}

exports.getSviObrociZaPlanZaDanas = async(plan_id, dan)=>{
    const niz_obroka = await plan_ishrane_obrok.findAll({
        where:{
            PlanIsID:plan_id
        }
    });

    const niz_id = niz_obroka.map(o=>o.ObrokID);
    const dan_check = "%" + dan + "%";
    const obroci_svi = await obrok.findAll({
        where:{
            ID:{[Op.or] : niz_id},
            Dan:{[Op.like]: dan_check}
        }
    })

    return obroci_svi;
    

}

exports.getSviObrociZaPlan = async(plan_id) =>{
    let niz_obroka = await plan_ishrane_obrok.findAll({
        where:{
            PlanIsID:plan_id
        }
    });

 
    let niz_id_obroka = niz_obroka.map(o=>o.ObrokID);

    return await obrok.findAll({
        where:{
            ID:{
                [Op.or] : niz_id_obroka
            }
            
        }
    })
}

exports.getObrokeZaVisePlanova = async(niz_id_planova) =>{
    let niz_obroka = [];
    niz_id_planova.forEach(ind =>{
        niz_obroka.push(this.getSviObrociZaPlan(ind));
    })

    return await niz_obroka;
}

exports.deleteSvaPojavljivanjaPlana = async(idPlana) =>{
    return await plan_ishrane_obrok.destroy({
        where:{
            PlanIsID:idPlana
        }
    })
}