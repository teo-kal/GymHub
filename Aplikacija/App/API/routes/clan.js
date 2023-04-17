/*const { Router } = require("express");

Router.use("/clan")*/

const express = require("express");
const app = express();
const router = express.Router();
//const authMiddleware = require('../auth.js');
const multer = require("multer");
const nodemailer = require("nodemailer");
const fse = require("fs-extra");
const authorizationMiddleware = require("../authorization.js");
//app.use(authMiddleware);
//router.use(authorizationMiddleware.ClanAdminPrivilegija);
app.use("/clan", router);

const clan_controller = require("../controller/clan");
const korisnik_controller = require("../controller/korisnik");
const clanarina_controller = require("../controller/clanarina");
const trener_controller = require("../controller/trener");
const grupa_controller = require("../controller/grupa");
const osoba_controller = require("../controller/osoba");
const plan_ishrane_controller = require("../controller/plan_ishrane");
const plan_treninga_controller = require("../controller/plan_treninga");
const vezba_controller = require("../controller/vezba");
const plan_treninga_vezba_controller = require("../controller/plan_treninga_vezba");
const obrok_controller = require("../controller/obrok");
const plan_ishrane_obrok_controller = require("../controller/plan_ishrane_obrok");
const trening_controller = require("../controller/trening");
const plan_treninga = require("../models/plan_treninga");
const { func } = require("joi");
const { ɵclearResolutionOfComponentResourcesQueue } = require("@angular/core");
const { findFormatter } = require("tslint");
//CLAN HOMEPAGE

router.use(ClanPrivilegija);

router.get("/home-clan/:id", async (req, res) => {
  console.log("EVOOO ME OVDEE");

  let dani = ["NED", "PON", "UTO", "SRE", "ČET", "PET", "SUB"];
  const datum = new Date();
  const danas = dani[datum.getDay()];
  const osoba = await osoba_controller.getSpecificOsoba(req.params.id);
  const clan = await clan_controller.getSpecificClan(req.params.id);
  let korisnik_trenera = null;
  let osoba_trenera = null;

  let plan_ishrane = null;
  let obroci = null;
  let plan_treninga = null;
  let opis_vezbi = null;
  let niz_id_vezbi = null;
  let nazivi_vezbi = null;
  let grupe = null;
  let trening = null;
  let naziv_grupe = null;
  console.log(clan);

  grupe = await grupa_controller.getSpecificGrupa(clan.GrupaID);
  if (grupe != null) naziv_grupe = grupe.Naziv;

  const trener = await trener_controller.getSpecificTrener(clan.TrenerID);
  if (trener != null) {
    korisnik_trenera = await korisnik_controller.getSpecificKorisnik(
      clan.TrenerID
    );
    osoba_trenera = await osoba_controller.getSpecificOsoba(clan.TrenerID);
  }

  const clanarina = await clanarina_controller.getClanarinaZaClana(clan.ID);

  plan_ishrane = await plan_ishrane_controller.getSpecificPlanIshrane(
    clan.PlanIsId
  ); //Naziv, Tip
  if (plan_ishrane != null)
    obroci = await plan_ishrane_obrok_controller.getSviObrociZaPlanZaDanas(
      plan_ishrane.ID,
      danas
    );

  plan_treninga = await plan_treninga_controller.getSpecificPlanTreninga(
    clan.PlanTrId
  );
  if (plan_treninga != null) {
    opis_vezbi = await plan_treninga_vezba_controller.getSveVezbeZaPlanZaDanas(
      clan.PlanTrId,
      danas
    );
    niz_id_vezbi = opis_vezbi.map((x) => x.VezbaID);
    nazivi_vezbi = await vezba_controller.getViseVezbiPoPlanu(niz_id_vezbi);
  }

  trening = await trening_controller.getTreningPoClanu(req.params.id);

  const obj_za_slanje = {
    Ime: osoba.Ime,
    Prezime: osoba.Prezime,
    DatPoslednjegPlacanja: clanarina.DatPoslednjegPlacanja,
    Ocenio: clan.Ocenio,
    Period: clanarina.Period,
    TipClanarine:clanarina.Tip,
    TrenerID: korisnik_trenera != null ? korisnik_trenera.ID : null,
    GrupaID: grupe != null ? grupe.ID : null,
    NazivGrupe: naziv_grupe,
    ImeTrenera: osoba_trenera != null ? osoba_trenera.Ime : null,
    PrezimeTrener: osoba_trenera != null ? osoba_trenera.Prezime : null,
    PolTrenera: osoba_trenera != null ? osoba_trenera.Pol : null,
    Ocena: trener != null ? trener.Ocena : null,
    Slika: korisnik_trenera != null ? korisnik_trenera.Slika : null,
    NazivPlanaTreninga: plan_treninga != null ? plan_treninga.Naziv : null,
    NaziviVezbi: nazivi_vezbi,
    VezbeDetalji: opis_vezbi,
    NazivPlanaIshrane: plan_ishrane != null ? plan_ishrane.Naziv : null,
    TipPlana: plan_ishrane != null ? plan_ishrane.Tip : null,
    Obroci: obroci,
    Trening: trening ? trening : null,
  };

  res.status(200).send(obj_za_slanje);
});

router.put("/trener/oceni", async (req, res) => {
  await clan_controller.updateClanOcenio(req.body.ID, 1).then(async () => {
    const ocena =
      req.body.Akcija === "up" ? req.body.Ocena + 1 : req.body.Ocena - 1;
    await trener_controller
      .updateTrenerOcena(ocena, req.body.TrenerID)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  });
});

//RADI
router.get("/treneri/", async (req, res) => {
  console.log("OVDEEEE SAAAAM");
  const korisnik_trener = await korisnik_controller.getSviKorisniciPoTipu("T"); //Slika
  const niz_id_korisnika = korisnik_trener.map((x) => x.ID);
  const osoba_trener = await osoba_controller.getViseOsobaPoID(
    niz_id_korisnika
  ); //Ime prezime
  const treneri = await trener_controller.getViseTrenera(niz_id_korisnika); //Specijalizacija, Ocena,BrPersTreninga,RadnoVreme
  //console.log(treneri);

  let niz_obj_slanje = [];
  korisnik_trener.forEach((k, ind) => {
    const obj = {
      ID: k.ID,
      Ime: osoba_trener[ind].Ime,
      Prezime: osoba_trener[ind].Prezime,
      Slika: k.Slika,
      Pol: osoba_trener[ind].Pol,
      Specijalizacija: treneri[ind].Specijalizacija,
      Ocena: treneri[ind].Ocena,
      BrPersTreninga: treneri[ind].BrPersTreninga,
      RadnoVreme: treneri[ind].RadnoVreme,
    };

    niz_obj_slanje.push(obj);
  });

  res.status(200).send(niz_obj_slanje);
});

//RADII
router.put("/treneri/zakazi/", async (req, res) => {
  const trener = await trener_controller.getSpecificTrener(req.body.TrenerID); //U JSON JE OVO "TrenerID":4 npr.
  const clan = await clan_controller.getSpecificClan(req.body.ID); // "ID":2, ovo je clan

  if (clan != undefined && trener != undefined) {
    await clan_controller
      .updateClanTrenera(trener.ID, clan.ID)
      .then(async () => {
        await clanarina_controller
          .updateClanarinaTip("Personalni", clan.ID)
          .then(() => {
            res.status(200).send();
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  } else {
    console.log("Nema trenera ili clanaa");
    res.status(400).send();
  }
});

//SVE OVE RADEE
router.get("/vezbe/obliques", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Trbušnjaci")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/pecks", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Grudi")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/glutes", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Gluteus")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/hamstrings", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Zadnja loža")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/quads", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Kvadricepsi")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/triceps", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Tricepsi")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/biceps", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Bicepsi")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/shoulders", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Ramena")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/calves", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Listovi")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/back", async (req, res) => {
  await vezba_controller
    .getVezbePoMisicu("Leđa")
    .then((listaVezbi) => {
      res.status(200).json(listaVezbi);
    })
    .catch(() => {
      res.status(500).send("Greska pri pribavljanju vezbi");
    });
});

router.get("/vezbe/SpecificVezba/:id", async (req, res) => {
  await vezba_controller
    .getSpecificVezba(req.params.id)
    .then((vezba) => {
      res.status(200).json(vezba);
    })
    .catch(() => res.status(500).send());
});

//RADII
router.get("/planovi/trening/:id_clana", async (req, res) => {
  const clan = await clan_controller.getSpecificClan(req.params.id_clana);
  const plan_treninga = await plan_treninga_controller.getSpecificPlanTreninga(
    clan.PlanTrId
  );
  if (plan_treninga != undefined) {
    const lista_vezbi = await plan_treninga_vezba_controller.getSveVezbeZaPlan(
      plan_treninga.ID
    );
    const niz_id_vezbi = lista_vezbi.map((x) => x.VezbaID);
    const nazivi_vezbi = await vezba_controller.getViseVezbiPoPlanu(
      niz_id_vezbi
    );

    const obj = {
      Naziv: plan_treninga.Naziv,
      Nivo: plan_treninga.Nivo,
      Trajanje: plan_treninga.Trajanje,
      Vezbe: lista_vezbi,
      Nazivi: nazivi_vezbi,
    };

    res.status(200).send(obj);
  } else res.status(400).send();
});

/*router.get('/planovi-treninga/:id_plana', async(req,res) =>{
    let vezbe_iz_medju = await plan_treninga_vezba_controller.getSveVezbeZaPlan(req.params.id_plana).catch(()=>{
        res.status(500).send('unable to get vezbe iz medju tabele');
}); //br serija, ponavljanja, sekundi, dani, rbr
    let niz_id_vezbi = vezbe_iz_medju.map(v => v.VezbaID);
    let vezbe = await vezba_controller.getViseVezbiPoPlanu(niz_id_vezbi).catch(()=>{
        res.status(500).send('unable to get vezbe');
    }); //video link, naziv, opis, misicna grupa
    
    let niz_objekata_za_slanje;

    vezbe.forEach(v =>{
        const obj = {
            "naziv" : v.Naziv,
            "opis" : v.Opis,
            "videoLink" : v.VideoLink,
            "misicnaGrupa":v.MisicnaGrupa,
            "brSerija": vezbe_iz_medju.find(vm=> vm.VezbaID === v.ID).BrSerija,
            "brPonavljanja": vezbe_iz_medju.find(vm => vm.VezbaID === v.ID).BrPonavljanja,
            "brSekundi":vezbe_iz_medju.find(vm => vm.VezbaID === v.ID).BrSekundi,
            "dani":vezbe_iz_medju.find(vm => vm.VezbaID === v.ID).Dani,
            "rBrVezbe":vezbe_iz_medju.find(vm => vm.VezbaID === v.ID).RBrVezbe
        }

        niz_objekata_za_slanje.push(obj);

    })

    res.status(200).json(niz_objekata_za_slanje);

})*/

router.get("/planovi/ishrana/:id_clana", async (req, res) => {
  const clan = await clan_controller.getSpecificClan(req.params.id_clana);
  const plan_ishrane = await plan_ishrane_controller.getSpecificPlanIshrane(
    clan.PlanIsId
  ); //Naziv,Tip
  if (plan_ishrane != undefined) {
    const niz_obroka = await plan_ishrane_obrok_controller.getSviObrociZaPlan(
      plan_ishrane.ID
    );
    // const niz_id = niz_obroka.map(o=>o.ObrokID);
    //const obroci = await obrok_controller.getViseObrokaNiz(niz_id);

    const obj = {
      Naziv: plan_ishrane.Naziv,
      Tip: plan_ishrane.Tip,
      Obroci: niz_obroka,
    };

    res.status(200).send(obj);
  } else res.status(400).send();
});

/*router.get('/planovi/ishrana/:id_plana', async(req,res)=>{
    let obroci_iz_medju = await plan_ishrane_obrok_controller.getSviObrociZaPlan(req.body.id_plana).then((listaObroka)=>{
        res.send(200).json(obroci_iz_medju);
    }).catch(()=>{
        res.status(500).send('Unable to get obroci za plan');
    });

})*/

router.get("/podesavanja/:id_clana", async (req, res) => {
  //osoba ime, prezime, broj racuna
  //korisnik username slika
  //clan cilj

  const osoba = await osoba_controller
    .getSpecificOsoba(req.params.id_clana)
    .catch(() => {
      res.status(500).send("Unable to get osoba");
    });
  const korisnik = await korisnik_controller
    .getSpecificKorisnik(req.params.id_clana)
    .catch(() => {
      res.status(500).send("Unable to get korisnik");
    });
  const clan = await clan_controller
    .getSpecificClan(req.params.id_clana)
    .catch(() => {
      res.status(500).send("Unable to get clan");
    });
    
   const telefon = await osoba_controller.getBrojTelOsobe(req.params.id_clana); 

  const obj_za_slanje = {
    Ime: osoba.Ime,
    Prezime: osoba.Prezime,
    BrojTelefona: telefon?telefon.map(t=>t.Telefon)[0]:null,
    KorisnickoIme: korisnik.KorisnickoIme,
    Slika: korisnik.Slika,
    Cilj: clan.Cilj,
    Pol: osoba.Pol,
  };

  res.status(200).json(obj_za_slanje);
});

//PUT, IZMENE U PODESAVANJIMA, dodato

router.put("/podesavanja/potvrdi", async (req, res) => {
  console.log(req.body);
  const novi_podaci = req.body;
  console.log(novi_podaci);
  // await korisnik_controller.updateKorisnikKorisnickoIme(
  //   novi_podaci.KorisnickoIme,
  //   novi_podaci.ID
  // );
  // await korisnik_controller.updateKorisnikLozinka(
  //   novi_podaci.Lozinka,
  //   novi_podaci.ID
  // );
  // await korisnik_controller.updateKorisnikSlika(
  //   novi_podaci.Slika,
  //   novi_podaci.ID
  // );

  await clan_controller
    .updateClanCilj(novi_podaci.Cilj, novi_podaci.ID)
    .then(async () => {
      await osoba_controller.updateBrTelefona(novi_podaci.BrojTelefona,novi_podaci.ID).then(()=>{
        res.status(200).send();
      }).catch((err)=>{
        console.log(err);
        res.status(500).send();
      })
    }).catch((err)=>{
      console.log(err);
      res.status(500).send();
    });

  
});

router.get("/prijavi-problem/:id_clana", async (req, res) => {
  //osoba ime prezime
  //korisnik email

  const osoba = await osoba_controller
    .getSpecificOsoba(req.params.id_clana)
    .catch(() => {
      res.status(500).send("Unable to get osoba");
    });

  const korisnik = await korisnik_controller
    .getSpecificKorisnik(req.params.id_clana)
    .catch(() => {
      res.status(500).send("Unable to get korisnik");
    });

  const obj = {
    ime: osoba.Ime,
    prezime: osoba.Prezime,
    email: korisnik.Email,
  };

  res.status(200).json(obj);
});

router.post("/prijavi-problem/posalji-mail", async (req, res) => {
  let mailAdresa = req.body.emailAdresa;
  //let pass = req.body.lozinka;

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
    subject: req.body.naslov + " " + mailAdresa,
    text: req.body.tekst,
  };

  transporter.sendMail(mailMessage, function (err, data) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
});

router.get("/pokazi-raspored", async (req, res) => {
  console.log('EVOOOOO MEEE U RASPORED');
  let nizGrupaSlanje = [];
  let treninziSlanje = [];
  await trening_controller.getSviTreninzi().then(async (treninzi) => {
    
    await trener_controller.getSviTreneri().then(async (treneri) => {
        await grupa_controller.getSveGrupe().then(async (grupe) => {
            await clan_controller.getSviClanovi().then((clanovi) => {
                grupe.forEach((g) => {
                  let ind = treneri.findIndex((t) => t.ID === g.TrenerID);
                  const obj = {
                    TrenerID: g.TrenerID,
                    BrPersTreninga: treneri[ind].BrPersTreninga,
                    Termini: g.Termini,
                    TrenutniKap: g.TrenutniKap,
                  };
                  nizGrupaSlanje.push(obj);
                });

                console.log('PROSAAO SAM OVAJ FOREACH, PRE TRENINGAA')
                treninzi.forEach((tren) => {
                  let clan_ind = clanovi.findIndex((c) => c.ID === tren.ClanID);
                  let trener_ind = treneri.findIndex(
                    (t) => t.ID === clanovi[clan_ind].TrenerID
                  );
                  const obj = {
                    Kod:tren.Kod,
                    Termin:tren.Termin,
                    ClanID:clanovi[clan_ind].ID,
                    TrenerID: treneri[trener_ind]?.ID,
                    BrPersTreninga: treneri[trener_ind]?.ID,
                  };

                  treninziSlanje.push(obj);
                });

                console.log('EVOOOO SALJEEEEM UPRAVOOO')
                res
                  .status(200)
                  .send({ grupa: nizGrupaSlanje, treninzi: treninziSlanje });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send();
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send();
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  });
});

router.post("/zakazi-trening", async (req, res) => {
  await trening_controller
    .createTrening(req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.delete("/otkazi-trening/:ClanID", async (req, res) => {
  await trening_controller
    .deleteTreningPoClanu(req.params.ClanID)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.put("/plati", async(req,res)=>{
  console.log(req.body, "HALOOOOOOOO OVDE SAAAAAM"); //ne ulazi ovde uopste
  await clanarina_controller.updateClanarinaDatumPosPlacanja(req.body.ClanID).then(async ()=>{
    await clanarina_controller.updateClanarinaPeriod(req.body.Period, req.body.ClanID).then(async()=>{
          await clanarina_controller.updateClanarinaTip(req.body.Tip, req.body.ClanID).then(async()=>{
                if(req.body.Tip === 'Personalni')
                {
                  await clan_controller.updateClanGrupa(null,req.body.ClanID).then(()=>{
                    res.status(200).send();
                  })
                }else{
                  if(req.body.Tip === 'Samostalni')
                  {
                    await clan_controller.updateClanGrupa(null,req.body.ClanID).then(async ()=>{
                          await clan_controller.updateClanTrenera(null,req.body.ClanID).then(()=>{
                            res.status(200).send();
                          })
                    })
                  }
                  else{
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

//idClana za trenera i termin
router.get("/proveri-termin-trener/:idClana", async(req,res)=>{
    let termin = req.headers.termin;
    console.log(termin);
    let clan = await clan_controller.getSpecificClan(req.params.idClana);
    let trenerID = clan.TrenerID;
    let nizTreninga = await trening_controller.getSviTreninziPoTerminu(req.headers.termin);
  
    let nizGrupa = await grupa_controller.getSveGrupe();
    nizGrupa = nizGrupa.filter(g=>g.Termini.includes(termin));
    let istiTrener = false;
    let i = 0;

    if(nizTreninga.length !== 0 && !istiTrener)
    {
      while(!istiTrener && nizTreninga.length - 1 != i)
      { 
        await clan_controller.getSpecificClan(nizTreninga[i].ClanID).then((clan)=>{
          i++;
          if(clan.TrenerID === trenerID)
              istiTrener = true;
        })
       
      }
    }

    nizGrupa.forEach(grupa => {
      if(grupa.TrenerID === trenerID){
          istiTrener = true;
      }
    });

    let sviTreninzi = await trening_controller.getSviTreninzi();
    sviTreninzi = sviTreninzi.filter(t=>t.Termin.toString().substring(0,3) === termin.toString().substring(0,3));
    let brojac = 0;

    sviTreninzi.forEach(async(trening)=>{
      await clan_controller.getSpecificClan(trening.ClanID).then((clan)=>{
          if(clan.TrenerID === trenerID)
              brojac++;
      })
    })

    let imaBrTreninga = false;
    let trenerPravi;
    if(trenerID)
    {
      trenerPravi = await trener_controller.getSpecificTrener(trenerID);

      if(brojac < trenerPravi.BrPersTreninga)
        imaBrTreninga = true;
    }
    
    if(!istiTrener && imaBrTreninga)
        res.status(200).send();
    else
        res.status(400).send();
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/userAvatars");
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
    };
    cb(null, file.fieldname + "-" + Date.now() + mimeExtension[file.mimetype]);
  },
});
const upload = multer({
  storage: storage,
});

router.post("/upload-sliku/:ID", upload.single("avatar"), async (req, res) => {
  const korisnik = await korisnik_controller.getSpecificKorisnik(req.params.ID);
  console.log(korisnik.Slika);

  if (korisnik.Slika != null)
    await fse.remove(
      "D:\\_Faks\\Semestar 6\\SWE\\Projekat\\si.21.05.gymhub\\Aplikacija\\App\\API\\public\\" +
        korisnik.Slika
    );

  console.log(req.file);
  let filePath = "userAvatars/";
  const slika = filePath + req.file.filename;
  await korisnik_controller
    .updateKorisnikSlika(slika, req.params.ID)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});




function ClanPrivilegija(req, res, next) {
  if (req.headers["tip"] == "T") res.status(401).send();
  else next();
}


module.exports = router;
