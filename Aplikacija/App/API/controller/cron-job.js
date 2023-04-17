const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');

const trening_controller = require("../controller/trening");

exports.obrisiSveTreninge = async()=>{
    await trening_controller.getSviTreninzi().then(async(treninzi)=>{
        treninzi.forEach(async (trening) => {
                await trening_controller.deleteTreningPoID(trening.ID);
        });
    })
}