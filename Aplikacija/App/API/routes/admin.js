const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const authorizationMiddleware = require("../authorization.js");
//const authMiddleware = require('../auth.js');

const response_functions = require("../response_func");

const clan_controller = require("../controller/clan");
const korisnik_controller = require("../controller/korisnik");
const osoba_controller = require("../controller/osoba");
const trener_controller = require("../controller/trener");
const plan_ishrane_controller = require("../controller/plan_ishrane");
const plan_treninga_controller = require("../controller/plan_treninga");
const vezba_controller = require("../controller/vezba");
const clanarina_controller = require("../controller/clanarina");
const grupa_controller = require("../controller/grupa");
const { read } = require("fs");
const e = require("express");
const trener = require("../models/trener");
//const { Json } = require('sequelize/types/lib/utils');

//app.use(authMiddleware);
//router.use(authorizationMiddleware.AdminPrivilegija);
app.use("/admin", router);

router.use(AdminPrivilegija);

//RADI
router.get("/", async (req, res) => {
  res.json("Kliknite na neku od opcija sa leve strane...");
  // response_functions.SetStatusAndMessage(res,200,'Kliknite na neku od opcija sa leve strane');
});

router.get("/clanovi-broj/:id", async (req, res) => {
  await osoba_controller
    .getBrojTelOsobe(req.params.id)
    .then((listTelefona) => {
      res.status(200).send(listTelefona);
    })
    .catch(() => {
      res.send("Nece telefoni");
    });
});

//CLANOVI
//RADI
router.get("/clanovi", async (req, res) => {
  let niz_objekata_za_slanje = [];

  const lista_korisnika = await korisnik_controller.getSviKorisniciPoTipu("C");
  //console.log(lista_korisnika);
  const niz_id_korisnika = lista_korisnika.map((k) => k.ID);
  const lista_osoba = await osoba_controller.getViseOsobaPoID(niz_id_korisnika);
  console.log(lista_osoba[0]);
  const lista_clanarina = await clanarina_controller.getSveClanarine();
  console.log(lista_clanarina[0]);
  const clanovi = await clan_controller.getSviClanovi();
  //console.log(clanovi);

  lista_korisnika.forEach((kor, ind) => {
    console.log(ind);
    const obj_slanje = {
      ID: kor.ID,
      Tip: kor.Tip,
      KorisnickoIme: kor.KorisnickoIme,
      Email: kor.Email,
      Slika: kor.Slika,
      Ime: lista_osoba[ind].Ime,
      Prezime: lista_osoba[ind].Prezime,
      Cilj: clanovi[ind].Cilj,
      Clanarina: lista_clanarina[ind],
      /*"TipClanarine":lista_clanarina[ind].Tip,
            "Period":lista_clanarina[ind].Period,
            "DatPoslednjegPlacanja":lista_clanarina[ind].DatPoslednjegPlacanja*/
    };

    niz_objekata_za_slanje.push(obj_slanje);
  });

  res.status(200).send(niz_objekata_za_slanje);
  /* const lista_clanova = await clan_controller.getSviClanovi().then(()=>{
        lista_korisnika.forEach((kor,ind)=>{
            const obj_slanje = {
                "ID":kor.ID,
                "Tip":kor.Tip,
                "KorisnickoIme":kor.KorisnickoIme,
                "Email":kor.Email,
                "Slika":kor.Slika,
                "Ime":lista_osoba[ind].Ime,
                "Prezime":lista_osoba[ind].Prezime,
                "Cilj":lista_clanova[ind].Cilj,
                "TipClanarine":lista_clanarina[ind].Tip,
                "Period":lista_clanarina[ind].Period,
                "DatPoslednjegPlacanja":lista_clanarina[ind].DatPoslednjegPlacanja
            }

            niz_objekata_za_slanje.push(obj_slanje);
        })

        console.log(niz_objekata_za_slanje);

        res.status(200).send(niz_objekata_za_slanje);
    }).catch(()=>{
        res.status(500).send('Ne moze GET za clanove');
    })*/
});

/*await clan_controller.getSviClanovi().then((listaClanova) =>{
        //response_functions.SetStatusAndBody(res,200,listaClanova)
        res.status(200).send(listaClanova);
    }).catch(() =>{
        //response_functions.SetStatusAndMessage(res,500,'Internal error')
        res.status(500).send('Internal server error');
    })*/

//RADI
router.get("/clanovi/:id", async (req, res) => {
  const kor = await korisnik_controller.getSpecificKorisnik(req.params.id);
  const os = await osoba_controller.getSpecificOsoba(req.params.id);
  const cl = await clan_controller.getSpecificClan(req.params.id);
  const clanarina_clana = await clanarina_controller.getClanarinaZaClana(
    req.params.id
  );

  const obj = {
    /*"ID": kor.ID,
       "KorisnickoIme": kor.KorisnickoIme,
       "Tip": kor.Tip,
       "Email": kor.Email,
       "Slika": kor.Slika,*/
    Korisnik: kor,
    Ime: os.Ime,
    Prezime: os.Prezime,
    Cilj: cl.Cilj,
    Clanarina: clanarina_clana,
  };

  res.status(200).send(obj);
});

//RADIi!
router.post(
  "/clanovi/kreiraj",
  KreirajKorisnika,
  KreirajOsobu,
  KreirajClana,
  KreirajClanarinu,
  async (req, res) => {
    res.status(200).send();
  }
);

async function KreirajKorisnika(req, res, next) {
  const novi_data = req.body;
  //IME, PREZIME, JMBG, DATRODJENJA, USERNAME, LOZINKA, TIP = C, POL, MAIL
  const old_korisnik = await korisnik_controller.getKorisnikPoUsername(
    novi_data.KorisnickoIme
  );
  if (old_korisnik != undefined)
    res.status(400).send("Vec postoji ovakav korisnik");

  const noviKorisnik = {
    Tip: "C",
    KorisnickoIme: novi_data.KorisnickoIme,
    Lozinka: novi_data.Lozinka,
    Email: novi_data.Email,
  };

  await korisnik_controller
    .createKorisnik(noviKorisnik)
    .then((kor) => {
      req.body.ID = kor.ID;
      next();
    })
    .catch(() => res.status(500).send("Zaaajeeb pri korisniku"));
}

async function KreirajKorisnikaTrener(req, res, next) {
    const novi_data = req.body;
    //IME, PREZIME, JMBG, DATRODJENJA, USERNAME, LOZINKA, TIP = C, POL, MAIL
    const old_korisnik = await korisnik_controller.getKorisnikPoUsername(
      novi_data.KorisnickoIme
    );
    if (old_korisnik != undefined)
      res.status(400).send("Vec postoji ovakav korisnik");
  
    const noviKorisnik = {
      Tip: "T",
      KorisnickoIme: novi_data.KorisnickoIme,
      Lozinka: novi_data.Lozinka,
      Email: novi_data.Email,
    };
  
    await korisnik_controller
      .createKorisnik(noviKorisnik)
      .then((kor) => {
        req.body.ID = kor.ID;
        next();
      })
      .catch(() => res.status(500).send("Zaaajeeb pri korisniku"));
  }

async function KreirajOsobu(req, res, next) {
  const novi_data = req.body;
  const novaOsoba = {
    ID: novi_data.ID,
    JMBG: novi_data.JMBG,
    Ime: novi_data.Ime,
    Prezime: novi_data.Prezime,
    DatRodjenja: novi_data.DatRodjenja,
    Pol: novi_data.Pol,
  };

  await osoba_controller
    .createOsoba(novaOsoba)
    .then(() => next())
    .catch((err) => res.status(500).send("Zajeeb kod osobe " + err));
}

async function KreirajClana(req, res, next) {
  const novi_data = req.body;
  const novi_clan = {
    ID: novi_data.ID,
    Cilj: novi_data.Cilj,
    DatUclanjivanja: new Date(Date.now()),
  };

  await clan_controller
    .createClan(novi_clan)
    .then(() => next())
    .catch((err) => res.status(500).send("Zajeeb kod clana " + err));
}

async function KreirajClanarinu(req, res, next) {
  const novi_data = req.body;
  const clanarina = {
    ClanId: novi_data.ID,
    Period:1,
    Tip:"Samostalni",
    DatPoslednjegPlacanja: new Date(Date.now()),
  };

  await clanarina_controller
    .createClanarina(clanarina)
    .then(() => next())
    .catch((err) => res.status(500).send("Zajeeb kod clanarine " + err));
}

//RADI
router.put("/clanovi/izmeni", async (req, res) => {
  const postojeci_clan = await clan_controller.getSpecificClan(req.body.ID);
  if (postojeci_clan != undefined) {
    //KORISNICKO IME ,EMAIL, TRAJANJE CLANARINE, CILJ

    const izmenjeni_clan = req.body;

    const novi_korisnik = {
      ID: postojeci_clan.ID,
      KorisnickoIme: izmenjeni_clan.KorisnickoIme,
      Email: izmenjeni_clan.Email,
    };

    await korisnik_controller.updateKorisnikCeo(novi_korisnik);

    await osoba_controller.updateOsobaBrRacuna(
      izmenjeni_clan.BrRacuna,
      req.body.ID
    );

    const novi_clan = {
      ID: req.body.ID,
      Cilj: izmenjeni_clan.Cilj,
    };

    await clan_controller
      .updateClan(novi_clan)
      .then(async function () {
        // await clanarina_controller.updateClanarinaPeriod(req.body.Period, postojeci_clan.ID);
        res.status(200).send("Clan uspesno azuriran");
      })
      .catch(() => {
        res.status(500).send("Internal error");
      });
  } else {
    res.status(404).send("Clan ne postoji!");
  }
});

router.delete("/clanovi/obrisi/:id", async (req, res) => {
  await clan_controller
    .deleteClan(req.params.id)
    .then(() => {
      res.status(200).json("Clan uspesno obrisan!");
    })
    .catch(() => {
      res.status(404);
    });
});

//TRENERI

router.get("/treneri", async (req, res) => {
  let niz_objekata_za_slanje = [];

  const lista_korisnika = await korisnik_controller.getSviKorisniciPoTipu("T");
  //console.log(lista_korisnika);
  const niz_id_korisnika = lista_korisnika.map((k) => k.ID);
  const lista_osoba = await osoba_controller.getViseOsobaPoID(niz_id_korisnika);
  console.log(lista_osoba[0]);
  const lista_trenera = await trener_controller.getSviTreneri();
  //console.log(clanovi);

  /*
        Ime":lista_osoba[ind]!=undefined?lista_osoba[ind].Ime:null,
            "Prezime":lista_osoba[ind]!=undefined?lista_osoba[ind].Prezime:null,
           "Cilj":clanovi[ind]!=undefined?clanovi[ind].Cilj:null,
            "Clanarina":lista_clanarina!=undefined?lista_clanarina[ind]:null
    */

  lista_korisnika.forEach((kor, ind) => {
    console.log(ind);
    const obj_slanje = {
      ID: kor.ID,
      Tip: kor.Tip,
      KorisnickoIme: kor.KorisnickoIme,
      Email: kor.Email,
      Slika: kor.Slika,
      Ime: lista_osoba[ind].Ime,
      Prezime: lista_osoba[ind].Prezime,
      Zvanje: lista_trenera[ind].Zvanje,
      Specijalizacija: lista_trenera[ind].Specijalizacija,
      BrPersTreninga: lista_trenera[ind].BrPersTreninga,
      RadnoVreme: lista_trenera[ind].RadnoVreme,
      /*"TipClanarine":lista_clanarina[ind].Tip,
            "Period":lista_clanarina[ind].Period,
            "DatPoslednjegPlacanja":lista_clanarina[ind].DatPoslednjegPlacanja*/
    };

    niz_objekata_za_slanje.push(obj_slanje);
  });

  res.status(200).send(niz_objekata_za_slanje);
});

router.get("/treneri/:id", async (req, res) => {
  await trener_controller
    .getSpecificTrener(req.params.id)
    .then((specificTrener) => {
      res.status(200).send(specificTrener);
    })
    .catch(() => {
      res.status(500).send("Internal server error");
    });

  const korisnik = await korisnik_controller.getSpecificKorisnik(req.params.id);
  console.log(korisnik);
  const osoba = await osoba_controller.getSpecificOsoba(req.params.id);
  console.log(osoba);
  const trener = await trener_controller.getSpecificTrener(req.params.id);
  console.log(trener);

  const obj = {
    /*"ID":korisnik.ID,
        "Tip":korisnik.Tip,
        "KorisnickoIme":korisnik.KorisnickoIme,
        "Email":korisnik.Email,
        "Slika":korisnik.Slika,*/
    Korisnik: korisnik,
    Ime: osoba.Ime,
    Prezime: osoba.Prezime,
    Zvanje: trener.Zvanje,
    Specijalizacija: trener.Specijalizacija,
    BrPersTreninga: trener.BrPersTreninga,
    RadnoVreme: trener.RadnoVreme,
  };

  res.status(200).send(obj);
});

//RADII
router.get("treneri-soc/:id", async (req, res) => {
  await trener_controller
    .getTrenerSocMreze(req.params.id)
    .then((listaSocMreza) => {
      res.status(200).send(listaSocMreza);
    })
    .catch(() => {
      res.status(500).send("Soc mreze ne rade");
    });
});

router.get("/treneri-soc/:id", async (req, res) => {
  await trener_controller
    .getTrenerSocMreze(req.params.id)
    .then((listaSocMreza) => {
      res.status(200).send(listaSocMreza);
    })
    .catch(() => {
      res.status(500).send("Soc mreze ne rade");
    });
});

//RADI
router.post("/treneri/kreiraj", KreirajKorisnikaTrener,KreirajOsobu, async (req, res) => {
  

        const svi_novi_podaci = req.body;
        const novi_trener = {
          ID: req.body.ID,
          Zvanje: svi_novi_podaci.Zvanje,
          Specijalizacija: svi_novi_podaci.Specijalizacija,
          GodIskustva: svi_novi_podaci.GodIskustva,
          DatZaposlenja: new Date(Date.now()),
          Ocena: 1,
          BrPersTreninga: svi_novi_podaci.BrPersTreninga,
          RadnoVreme: svi_novi_podaci.RadnoVreme,
        };

        await trener_controller
          .createTrener(novi_trener)
          .then(() => {
            res.status(200).send();
          })
          .catch(() => {
            res.status(500).send();
          });
    
    
  
});

router.put("/treneri/izmeni", async (req, res) => {
  const postojeci_trener = await trener_controller.getSpecificTrener(
    req.body.ID
  );
  if (postojeci_trener != undefined) {
    const izmenjeni_trener = req.body;

    const novi_trener = {
      ID: izmenjeni_trener.ID,
      Specijalizacija: izmenjeni_trener.Specijalizacija,
      Zvanje: izmenjeni_trener.Zvanje,
    };

    await trener_controller
      .updateTrener(novi_trener)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => {
        res.status(500).send();
      });
  } else {
    res.status(404).send();
  }
});

router.delete("/treneri/obrisi/:id", async (req, res) => {
  await trener_controller
    .deleteTrenerID(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

//ISHRANA

router.get("/ishrana", async (req, res) => {
  await plan_ishrane_controller
    .getSviPlanoviIshrane()
    .then((listaPlanova) => {
      res.status(200).send(listaPlanova);
    })
    .catch(() => {
      res.status(500).send("Internal server error");
    });
});

router.get("/ishrana/:id", async (req, res) => {
  await plan_ishrane_controller
    .getSpecificPlanIshrane(req.params.id)
    .then((specificPlanIs) => {
      res.status(200).send(specificPlanIs);
    })
    .catch(() => {
      res.status(500).send("internal server error");
    });
});

//MORA DA SE PROSLEDE PODACI O PLANU KAO TAKVOM I PRITOM NIZ ID-EVA PLANOVA OBROKA KOJI SU U OVOM PLANU ISHRANE

router.post("/ishrana/kreiraj", async (req, res) => {
  if (true) {
    const novi_plan = req.body;
    await plan_ishrane_controller
      .createPlanIshrane(novi_plan)
      .then(() => {
        res.status(200).send("Plan uspesno kreiran!");
      })
      .catch(() => {
        res.send(403).send("Bad request");
      });
  } else {
    res.send(400).send("Plan ishrane vec postoji!");
  }
});

/*router.put('/admin-ishrana/izmeni', async(req,res) =>{
    const postojeci_plan = await plan_ishrane_controller.getSpecificPlanIshrane(JSON.parse(req.body).ID);
    if(postojeci_plan){
        const novi_plan = JSON.parse(req.body);
        await plan_ishrane_controller.updatePlanIshraneTip
    }
})*/

router.delete("/ishrana/obrisi/:id", async (req, res) => {
  await plan_ishrane_controller
    .deletePlanIshrane(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

//TRENING

//RADI
router.get("/trening", async (req, res) => {
  await plan_treninga_controller
    .getSviPlanoviTreninga()
    .then((listaPlanova) => {
      res.status(200).send(listaPlanova);
    })
    .catch(() => {
      res.status(500).send("Internal server error");
    });
});

//RADI
router.get("/trening/:id", async (req, res) => {
  await plan_treninga_controller
    .getSpecificPlanTreninga(req.params.id)
    .then((specificPlanTr) => {
      res.status(200).send(specificPlanTr);
    })
    .catch(() => {
      res.status(500).send("internal server error");
    });
});

router.post("/trening/kreiraj", async (req, res) => {
  if (true) {
    const novi_plan = req.body;
    await plan_treninga_controller
      .createPlanTreninga(novi_plan)
      .then(() => {
        res.status(200).send("Plan uspesno kreiran!");
      })
      .catch(() => {
        res.send(403).send("Bad request");
      });
  } else {
    res.send(400).send("Plan treninga vec postoji!");
  }
});

router.delete("/trening/obrisi/:id", async (req, res) => {
  await plan_treninga_controller
    .deletePlanTreningaID(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

//VEZBE

router.get("/vezbe", async (req, res) => {
  await vezba_controller
    .getSveVezbe()
    .then((listaVezbi) => {
      res.status(200).send(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Internal server error");
    });

  /* const obj = {
        "ime":"Brate",
        "prezime":"Ajde",
        "nadimak":"Molim te",
        "radi":"radi"
    }

    res.status(200).json(obj);*/
});

router.get("/vezbe/:id", async (req, res) => {
  // console.log(req.params.id);
  await vezba_controller
    .getSpecificVezba(req.params.id)
    .then((specificVezba) => {
      res.status(200).send(specificVezba);
    })
    .catch(() => {
      res.status(500).send("Internal server error");
    });

  //res.status(200).send(req.params.id);
});

router.post("/vezbe/kreiraj", async (req, res) => {
  const nova_vezba = req.body;
  await vezba_controller
    .createVezba(nova_vezba)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(500).send();
    });
});

router.delete("/vezbe/obrisi/:id", async (req, res) => {
  await vezba_controller
    .deleteVezbaID(req.params.id)
    .then(() => {
      res.status(200).json("");
    })
    .catch(() => {
      res.status(400).send("Bad request!");
    });
});

//update vezba?

router.get("/grupe", async (req, res) => {
  await grupa_controller
    .getSveGrupe()
    .then((listaGrupa) => {
      res.status(200).send(listaGrupa);
    })
    .catch(() => {
      res.status(500).send("grupe greska");
    });
});

router.delete("/grupe/obrisi/:id", async (req, res) => {
  await grupa_controller
    .deleteGrupa(req.params.id)
    .then(() => {
      console.log('USPEEEEO SAM, EVE ME');
      res.status(200).send();
    })
    .catch((err) => {
      console.log('NISAM USPEO, EVE ME' + err);
      res.status(500).send();
    });
});


router.put("/clanovi/potvrdi-uplatu-clana", async(req,res)=>{

 
  await clanarina_controller.updateClanarinaDatumPosPlacanja(req.body.ClanID).then(async ()=>{
        await clanarina_controller.updateClanarinaPeriod(req.body.Period, req.body.ClanID).then(async()=>{
              await clanarina_controller.updateClanarinaTip(req.body.Tip, req.body.ClanID).then(async()=>{
                    if(req.body.Tip === 'Personalni')
                    {
                      await clan_controller.updateClanGrupa(null,req.body.ClanID).then(()=>{
                        res.status(200).send();
                      })
                    }
                    else{
                      if(req.body.Tip === 'Samostalni')
                      {
                        await clan_controller.updateClanGrupa(null,req.body.ClanID).then(async ()=>{
                              await clan_controller.updateClanTrenera(null,req.body.ClanID).then(()=>{
                                res.status(200).send();
                              })
                        })
                      }else{
                        res.status(200).send();
                      }
                      
                    }
                
              }).catch((err)=>{
                console.log(err);
                res.status(500).send();
              })
        }).catch((err)=>{
          console.log(err);
          res.status(500).send();
        })
  }).catch((err)=>{
    console.log(err);
    res.status(500).send();
  })
})

function AdminPrivilegija(req, res, next) {
  const Tip = req.headers["tip"];
  if (Tip == "A") next();
  else return res.status(401).send();
}

module.exports = router;
