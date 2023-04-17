//const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
//(sequelize,Sequelize)

const sequelize = require('../sequelize');
const korisnik = require('../models/korisnik')(sequelize,Sequelize);
const grupa = require('../models/grupa')(sequelize,Sequelize);

exports.createKorisnik = async(newKorisnik) =>{
    return await korisnik.create(newKorisnik);
}

exports.getSviKorisnici = async() =>{
    return await korisnik.findAll();
}

exports.getSpecificKorisnik = async(id) =>{
    return await korisnik.findOne({
        where:{
            ID:id
        }
    })
}

exports.getKorisnikPoEmail = async(mail)=>{
    return await korisnik.findOne({
        where:{
            Email:mail
        }
    })
}

exports.getSviKorisniciPoTipu = async(tip) =>{
    return await korisnik.findAll({
        where:{
            Tip:tip
        }
    })
}

exports.getKorisnikPoUsername = async(username) =>{
    return await korisnik.findOne({
        where:{
            KorisnickoIme:username
        }
    })
}

exports.updateKorisnikCeo = async(newKorisnik) =>{
    return await korisnik.update({
        KorisnickoIme:newKorisnik.KorisnickoIme,
        Email:newKorisnik.Email
    },{
        where:{
            ID:newKorisnik.ID
        }
    })
}


exports.updateKorisnikTip = async(updatedTip, korisnikID) =>{
    return await korisnik.update({
        Tip:updatedTip
    },{
        where:{
            ID:korisnikID
        }
    })
}

exports.updateKorisnikEmail = async(novi_email, korisnikID)=>{
    return await korisnik.update({
        Email:novi_email
    },{
        where:{
            ID:korisnikID
        }
    })
}

exports.updateKorisnikKorisnickoIme = async(updatedUsername, korisnikID) =>{
    return await korisnik.update({
        KorisnickoIme:updatedUsername
    },{
        where:{
            ID:korisnikID
        }
    })
}

exports.updateKorisnikSlika = async(novaSlika, korisnikID)=>{
    return await korisnik.update({
        Slika:novaSlika
    },{
        where:{
            ID:korisnikID
        }
    })
}

exports.updateKorisnikLozinka = async(updatedPass,korisnikID) =>{
    return await korisnik.update({
        Lozinka:updatedPass
    },{
        where:{
            ID:korisnikID
        }
    })
}

exports.deleteKorisnik = async(korisnikID) =>{
    return await korisnik.destroy({
        where:{
            ID:korisnikID
        }
    })
}

exports.deleteSviKorisniciPoTipu = async(tip) =>{
    return await korisnik.destroy({
        where:{
            Tip:tip
        }
    })
}

exports.deleteKorisnikPoKorisnickomImenu = async(username) =>{
    return await korisnik.destroy({
        where:{
            KorisnickoIme:username
        }
    })
}

