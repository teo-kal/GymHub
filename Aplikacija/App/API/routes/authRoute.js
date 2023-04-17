
require('dotenv').config();
const express = require('express');
const nodemailer = require("nodemailer");
const app = express();
const jwt = require('jsonwebtoken');
//const Joi = require('joi');
const router = express.Router();
//const joi = require('joi');
const sequelize = require('../sequelize');
const {Sequelize} = require('sequelize');
const korisnik = require('../models/korisnik')(sequelize,Sequelize);
const osoba = require('../models/osoba')(sequelize,Sequelize);
const clan = require('../models/clan')(sequelize,Sequelize);
const clan_controller = require('../controller/clan');
const bcrypt = require('bcrypt');

const korisnik_controller = require('../controller/korisnik');
const osoba_controller = require('../controller/osoba');
const clanarina_controller = require('..//controller/clanarina');
const { sign } = require('crypto');
//const router = require('./admin');


//app.use('/nalog', authRouter);
//app.use(express.json());
app.use('/nalog',router);

//router.post('/kreiraj', createNalogSchema, createNalog);

router.post('/login', async(req,res)=>{
    
    console.log('EVOOOO');
    //res.status(200).send('EVOOO');

   const loginPodaci = req.body; //korisncicko ime ,lozinka
   const korisnik = await korisnik_controller.getKorisnikPoUsername(req.body.KorisnickoIme);

    /*console.log(loginPodaci);
    console.log(korisnik);*/
    if(korisnik != undefined)
    {
        console.log('Postoji korisnik');
        console.log(korisnik.Lozinka);
        console.log(loginPodaci.Lozinka);
        if(loginPodaci.Lozinka == korisnik.Lozinka)
        {
            const payloadKorisnik = {ID:korisnik.ID};
           // const accessToken = jwt.sign(payloadKorisnik, process.env.ACCESS_TOKEN_SECRET);
           const accessToken = generateToken(payloadKorisnik);
           const refreshToken = jwt.sign(payloadKorisnik, process.env.REFRESH_TOKEN_SECRET);
           //MORA DA SACUVAS REFRESH TOKEN U BAZI NEGDE
            res.send({accessToken:accessToken, refreshToken:refreshToken, korisnikID:korisnik.ID, tipKorisnika:korisnik.Tip});
        }
        else
            res.status(400).send('Netacna');
        /*bcrypt.compare(loginPodaci.Lozinka,korisnik.Lozinka, function(err,result){
            if(result == true)
            {
                console.log('Tacna i sifra');
                res.status(200);
            }
            else
            {
                console.log('Netacna sifra');
                res.status(400);
            }
        })*/
    }
    else{
        console.log('Nema takvog korisnika');
        res.status(400).send();
    }


})


router.post("/posalji-reset-mail", async(req,res)=>{
   

   
  
    const transporter = nodemailer.createTransport({
      service: "outlook",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "a.gymhub@outlook.com",
        pass: "Fn7X!_GpJs5?fK",
      },
    });
  
    const mailMessage = {
      from: "a.gymhub@outlook.com",
      to: req.body.Email,
      subject: "Resetovanje lozinke",//req.body.naslov,
      text: "Poštovani, unesite sledeći kod na stranici sajta kako bi smo verifikovali Vaš identitet i omogućili Vam resetovanje lozinke: " + req.body.Kod,
    };
  
    transporter.sendMail(mailMessage, function (err, data) {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send();
      }
    });
})


router.put("/resetuj-lozinku", async(req,res)=>{
    await korisnik_controller.getKorisnikPoEmail(req.body.Email).then(async(kor)=>{
        await korisnik_controller.updateKorisnikLozinka(req.body.Lozinka, kor.ID).then(()=>{
            res.status(200).send();
        }).catch((err)=>{
            console.log(err);
            res.status(500).send();
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).send();
    })
})



router.post('/register', KreirajKorisnika,KreirajOsobu,KreirajClana,KreirajClanarinu, async(req,res)=>{


            const payloadKorisnik = {ID:req.body.ID};
            const accessToken = jwt.sign(payloadKorisnik, process.env.ACCESS_TOKEN_SECRET);
            const refreshToken = jwt.sign(payloadKorisnik, process.env.REFRESH_TOKEN_SECRET);
            res.status(200).send({accessToken:accessToken, refreshToken:refreshToken, korisnikID:req.body.ID});

})


async function KreirajKorisnika(req,res,next){
    const novi_data = req.body;
    //IME, PREZIME, JMBG, DATRODJENJA, USERNAME, LOZINKA, TIP = C, POL, MAIL
    const old_korisnik = await korisnik_controller.getKorisnikPoUsername(novi_data.KorisnickoIme);
    if(old_korisnik != undefined)
        res.status(400).send('Vec postoji ovakav korisnik');

    const noviKorisnik = {
        "Tip":"C",
        "KorisnickoIme":novi_data.KorisnickoIme,
        "Lozinka":novi_data.Lozinka,
        "Email":novi_data.Email
    }

    await korisnik_controller.createKorisnik(noviKorisnik).then((kor)=>
    {
        req.body.ID = kor.ID;
        next()
    }
    )
            .catch(()=>res.status(500).send('Zaaajeeb pri korisniku'));
}


async function KreirajOsobu(req,res,next) {
    const novi_data = req.body;
    const novaOsoba = {
        "ID":novi_data.ID,
        "JMBG":novi_data.JMBG,
        "Ime":novi_data.Ime,
        "Prezime":novi_data.Prezime,
        "DatRodjenja":novi_data.DatRodjenja,
        "Pol":novi_data.Pol
    }

    await osoba_controller.createOsoba(novaOsoba).then(()=>next()).catch((err)=>res.status(500).send('Zajeeb kod osobe ' + err));
}

async function KreirajClana(req,res,next) {
    const novi_data = req.body;
    const novi_clan = {
        "ID":novi_data.ID,
        "Cilj":novi_data.Cilj,
        "DatUclanjivanja":new Date(Date.now())
    }

    await clan_controller.createClan(novi_clan).then(()=>next()).catch((err)=>res.status(500).send('Zajeeb kod clana ' + err));
}

async function KreirajClanarinu(req,res,next) {
    const novi_data = req.body;
        const clanarina = {
            "ClanId" : novi_data.ID,
            "Tip":"Samostalni",
            "Period":1,
            "DatPoslednjegPlacanja": new Date(Date.now())
        }

        await clanarina_controller.createClanarina(clanarina).then(()=>next()).catch((err)=>res.status(500).send('Zajeeb kod clanarine ' + err))    
}

router.post('/napravi-clana', async(req,res)=>{

    const podaci = req.body;
    const novi_clan = {
        "ID": podaci.ID,
        "TrenerID":podaci.TrenerID,
        "Cilj":podaci.Cilj
    }
    await clan_controller.createClan(novi_clan).catch(()=>res.status(500).send('Zajeeeb kod clana'));

   if(podaci.BrRacuna != null) 
        await osoba_controller.updateOsobaBrRacuna(podaci.BrRacuna, podaci.ID).catch(()=>res.status(500).send('Zajeeb kod BrRacuna'));

    res.status(200);    


})


router.post('/token', async(req,res)=>{

    const refreshToken = req.body.refreshToken;
    if(refreshToken == null) return res.status(401);
    //proveris da ga access token nema u bazi nigde, pa ako prodje i ot

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, korisnik)=>{

        if(err) return res.status(403);
        const accessToken = generateToken({ID:korisnik.ID});
        return res.send({accessToken:accessToken});
    })
})

router.post('/posalji-info-mail', async(req,res)=>{
  const transporter = nodemailer.createTransport({
    service: "outlook",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "a.gymhub@outlook.com",
      pass: "Fn7X!_GpJs5?fK",
    },
  });

  const mailMessage = {
    from: "a.gymhub@outlook.com",
    to: "a.gymhub@outlook.com",
    subject: req.body.Naslov + " " + req.body.Ime + " " + req.body.Prezime + " na " + req.body.Email,
    text: req.body.Tekst,
  };

  transporter.sendMail(mailMessage, function (err, data) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
})

function generateToken(korisnik){
    return jwt.sign(korisnik, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10d'});
}


//GET HEADER Authorization: BEARER TOKEN


function  authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)
        return res.status(401); //access denied

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payloadKorisnik)=>{
        if(err)
            return res.status(403);
        
        //auth uspesan
        next();
    })    
}

module.exports = router;








