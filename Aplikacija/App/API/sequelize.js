const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('baza_swe', 'root','root',{
    host:'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
    }
});

async function Testiraj(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

Testiraj();

const administator = require('./models/administrator')(sequelize,Sequelize);
const clan = require('./models/clan')(sequelize,Sequelize);
const korisnik = require('./models/korisnik')(sequelize,Sequelize);
const trener = require('./models/trener')(sequelize,Sequelize);
const clanarina = require('./models/clanarina')(sequelize,Sequelize);
const grupa = require('./models/grupa')(sequelize,Sequelize);
const plan_ishrane_obrok = require('./models/plan_ishrane_obrok')(sequelize,Sequelize);
const plan_ishrane = require('./models/plan_ishrane')(sequelize,Sequelize);
const plan_treninga = require('./models/plan_treninga')(sequelize,Sequelize);
const plan_treninga_vezba = require('./models/plan_treninga_vezba')(sequelize,Sequelize);
const socmreza_trener = require('./models/socmreza_trener')(sequelize,Sequelize);
const telefon_osoba = require('./models/telefon_osoba')(sequelize,Sequelize);
const trening = require('./models/trening')(sequelize,Sequelize);
const osoba = require('./models/osoba')(sequelize,Sequelize);
const obrok = require('./models/obrok')(sequelize,Sequelize);
const vezba = require('./models/vezba')(sequelize,Sequelize);


osoba.belongsTo(korisnik,{
    foreignKey:'ID',
    onDelete:'CASCADE'
})

clan.belongsTo(osoba,{
    foreignKey:'ID',
    onDelete:'CASCADE'
})

trener.belongsTo(osoba,{
    foreignKey:'ID',
    onDelete:'CASCADE'
})

administator.belongsTo(korisnik,{
    foreignKey:'ID',
    onDelete:'CASCADE'
})

clan.belongsTo(trener,{
    foreignKey:'TrenerID',
    onDelete: 'SET NULL'
})

clan.belongsTo(grupa,{
    foreignKey:'GrupaID',
    onDelete:'SET NULL'
})

clan.belongsTo(plan_treninga,{
    foreignKey:'PlanTrId',
    onDelete:'SET NULL'
})

clan.belongsTo(plan_ishrane,{
    foreignKey:'PlanIsId',
    onDelete:'SET NULL'
})

clanarina.belongsTo(clan,{
    foreignKey:'ClanId',
    onDelete:'CASCADE'
})

grupa.belongsTo(trener,{
    foreignKey:'TrenerID',
    onDelete:'CASCADE'
})

grupa.belongsTo(plan_ishrane,{
    foreignKey:'PlanIsId',
    onDelete:'SET NULL'
})

grupa.belongsTo(plan_treninga,{
    foreignKey:'PlanTrID',
    onDelete:'SET NULL'
})

osoba.belongsTo(korisnik,{
    foreignKey:'ID',
    onDelete:'CASCADE'
})

plan_treninga.belongsTo(trener,{
    foreignKey:'TrenerID',
    onDelete:'CASCADE'
})

plan_ishrane.belongsTo(trener,{
    foreignKey:'TrenerID',
    onDelete:'CASCADE'
})

//Movie.belongsToMany(Actor, { through: ActorMovies });
//Actor.belongsToMany(Movie, { through: ActorMovies });

plan_ishrane.belongsToMany(obrok, {through:plan_ishrane_obrok});
obrok.belongsToMany(plan_ishrane,{through:plan_ishrane_obrok});

plan_treninga.belongsToMany(vezba,{through:plan_treninga_vezba});
vezba.belongsToMany(plan_treninga,{through:plan_treninga_vezba});


/*
Team.hasMany(Player);
Player.belongsTo(Team);
 */

trener.hasMany(socmreza_trener,{
    foreignKey:'TrenerID',
    onDelete:'CASCADE'
});
socmreza_trener.belongsTo(trener);

osoba.hasMany(telefon_osoba,{
    foreignKey:'osobaID',
    onDelete:'CASCADE'
});
telefon_osoba.belongsTo(osoba);

trening.belongsTo(clan,{
    foreignKey:'ClanID',
    onDelete:'CASCADE'
})

module.exports = sequelize;

async function Sinhronizuj(){
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
}

Sinhronizuj();

