const express = require('express');
const app = express();
const router = express.Router();

const clan_controller = require('../controller/clan');
const korisnik_controller = require('../controller/korisnik');
const osoba_controller = require('../controller/osoba');

app.use('/auth',router);

router.post('/register',async(req,res)=>{

    const novi_podaci = req.body;

    const old_korisnik = await korisnik_controller.getKorisnikPoUsername(novi_podaci.KorisnickoIme);
    if(old_korisnik != undefined)
    {
        res.status(400).send('Vec postoji korisnik');
    }

})