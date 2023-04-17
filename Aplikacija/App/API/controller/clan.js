const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)
const clan = require('../models/clan')(sequelize,Sequelize);
const osoba = require('../models/osoba')(sequelize,Sequelize);
const korisnik = require('../models/korisnik')(sequelize,Sequelize);
const clanarina = require('../models/clanarina')(sequelize,Sequelize);
const Op = require('sequelize').Op;

exports.createClan = async (newClan) =>{
    return await clan.create(newClan);
}

exports.getSviClanovi = async() => {
    return await clan.findAll();
}


exports.getSviClanoviGrupe = async(grupaID) => {
    return await clan.findAll({
        where:{
            GrupaID: grupaID
        }
    })
}

exports.getSviClanoviTrenera = async(trenerID) => {
    return await clan.findAll({
        where:{
            TrenerID: trenerID
        }
    })
}

exports.getSviPersVezbaceTrenera = async(trenerID) =>{
    return await clan.findAll({
        where:{
            GrupaID:{
                [Op.is] : null
            },
            TrenerID:trenerID
        }
    })
}

exports.getSpecificClan = async(id) => {
    return await clan.findOne({
        where: {
            ID: id
        }
    })
}

exports.updateClan = async (old_clan, updatedClan) =>{
    
   console.log(updatedClan.ID + ' ' + updatedClan.Cilj + ' ' + updatedClan.DatUclanjivanja); 

    return await clan.update({
        Cilj: updatedClan.Cilj
    },
    {
        where:{
            ID: updatedClan.ID
        },
        returning: true
    })

   /* old_clan.TrenerID = updatedClan.TrenerID;
    old_clan.GrupaID = updatedClan.GrupaID;
    old_clan.Cilj = updatedClan.Cilj;
    old_clan.DatUclanjivanja = updatedClan.DatUclanjivanja;
    old_clan.PlanTrId = updatedClan.PlanTrId;
    old_clan.PlanIsId = updatedClan.PlanIsId;
    return await old_clan.save();*/

}

exports.updateClanTrenera = async(trenerID,clan_id) =>{
    return await clan.update({
        TrenerID:trenerID
    },{
        where:{
            ID:clan_id
        }
    })
}

exports.updateClanGrupa = async(grupaID,clan_id) =>{
    return await clan.update({
        GrupaID:grupaID
    },{
        where:{
            ID:clan_id
        }
    })
}

exports.updateClanCilj = async(cilj,clan_id) =>{
    return await clan.update({
        Cilj:cilj
    },{
        where:{
            ID:clan_id
        }
    })
}

exports.updateClanOcenio = async(clanID,ocenio) =>{
    return await clan.update({
        Ocenio:ocenio
    },{
        where:{
            ID:clanID
        }
    })
}

exports.updateClanPlanTr = async(plan_tr_Id,clan_id) =>{
    return await clan.update({
        PlanTrId:plan_tr_Id
    },{
        where:{
            ID:clan_id
        }
    })
}


exports.updateSviClanoviGrupePlanTreninga = async(grupaID, planID) =>{

    return await clan.update({
        PlanTrId : planID
    },{
        where:{
            GrupaID : grupaID
        }
    })

}

exports.updateSviClanoviGrupePlanIshrane = async(grupaID, planID) =>{

    return await clan.update({
        PlanIsId : planID
    },{
        where:{
            GrupaID : grupaID
        }
    })

}

exports.updateClanPlanIs = async(plan_is_id,clan_id) =>{
    return await clan.update({
        PlanIsId:plan_is_id
    },{
        where:{
            ID:clan_id
        }
    })
}


exports.deleteClan = async(ID) => {
    return await clan.destroy({
        where:{
            ID:ID
        }
    }).then(osoba.destroy({
        where:{
            ID:ID
        }
    })).then(korisnik.destroy({
        where:{
            ID:ID
        }
    })).then(clanarina.destroy({
        where:{
            ClanId:ID
        }
    }))
}

exports.deleteSveClanoveTrenera = async(trenerID) => {
    return await clan.destroy({
        where:{
            TrenerID:trenerID
        }
    })
}

exports.deleteSveClanoveGrupe = async(grupaID) => {
    return await clan.destroy({
        where:{
            GrupaID: grupaID
        }
    })
}

