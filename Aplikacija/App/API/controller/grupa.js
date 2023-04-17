//const sequelize = require('../sequelize');
const { Sequelize } = require("sequelize");
//(sequelize,Sequelize)

const sequelize = require("../sequelize");
const grupa = require("../models/grupa")(sequelize, Sequelize);
const clan = require("../models/clan")(sequelize, Sequelize);
const clan_controller = require("../controller/clan");
const Op = require("sequelize").Op;

exports.createGrupa = async (newGrupa) => {
  return await grupa.create(newGrupa);
};

exports.getSveGrupe = async () => {
  return await grupa.findAll();
};

exports.getSpecificGrupa = async (grupaID) => {
  return await grupa.findOne(
    {
      where: {
        ID: grupaID,
      },
    }
  );
};

exports.getGrupaPoTreneru = async (trenerID) => {
  return await grupa.findAll({
    where: {
      TrenerID: trenerID,
    },
  });
};

exports.getGrupaPoNazivu = async (naziv) => {
  return await grupa.findOne(
    {
      attributes: ["ID", "Naziv,Termini", "Kapacitet"],
    },
    {
      where: {
        Naziv: naziv,
      },
    }
  );
};

exports.updateGrupa = async (updatedGrupa) => {
  return await grupa.update(
    {
      TrenerID: updatedGrupa.TrenerID,
      Termini: updatedGrupa.Termini,
      Naziv: updatedGrupa.Naziv,
      Kapacitet: updatedGrupa.Kapacitet,
      PlanTrID: updatedGrupa.PlanTrID,
      PlanIsId: updatedGrupa.PlanIsId,
    },
    {
      where: {
        ID: updatedGrupa.ID,
      },
    }
  );
};

exports.updateGrupaPlanTr = async (id_plana, id_grupe) => {
  return await grupa.update(
    {
      PlanTrID: id_plana,
    },
    {
      where: {
        ID: id_grupe,
      },
    }
  ).then(async ()=>{
      return await clan_controller.updateSviClanoviGrupePlanTreninga(id_grupe, id_plana)
  });
};

exports.updateGrupaPlanIshrane = async (id_plana, id_grupe) => {
  return await grupa.update(
    {
      PlanIsId: id_plana,
    },
    {
      where: {
        ID: id_grupe,
      },
    }
  ).then(async ()=>{
      return await clan_controller.updateSviClanoviGrupePlanIshrane(id_grupe, id_plana)
  });
};

exports.deleteGrupa = async (grupaID) => {
  let clan_id_niz;
  clan
    .findAll({
      where: {
        GrupaID: grupaID,
      },
    })
    .then((clan) => {
      clan_id_niz = clan.map((c) => c.ID);
    });

  return await grupa
    .destroy({
      where: {
        ID: grupaID,
      },
    })
    .then(
      clan.update(
        {
          GrupaID: null,
        },
        {
          where: {
            ID: { [Op.or]: clan_id_niz },
          },
        }
      )
    );
};

exports.deleteGrupaPoTreneru = async (trenerID) => {
  return await grupa.destroy({
    where: {
      TrenerID: trenerID,
    },
  });
};

exports.deleteGrupaPoNazivu = async (naziv) => {
  return await grupa.destroy({
    where: {
      Naziv: naziv,
    },
  });
};

exports.updateTrenutniKapGrupe = async(idGrupe,trenKap)=>{
  return await grupa.update({
    TrenutniKap: trenKap
  },{
    where:{
      ID:idGrupe
    }
  })
}
