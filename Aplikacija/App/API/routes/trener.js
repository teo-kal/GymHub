const express = require("express");
const app = express();
const router = express.Router();
//const authMiddleware = require('../auth.js');
const multer = require("multer");
const nodemailer = require("nodemailer");
const fse = require("fs-extra");
const authorizationMiddleware = require("../authorization.js");
//app.use(authMiddleware);
//router.use(authorizationMiddleware.TrenerAdminPrivilegija);
app.use("/trener", router);

const trener_controller = require("../controller/trener");
const osoba_controller = require("../controller/osoba");
const korisnik_controller = require("../controller/korisnik");
const plan_ishrane_controller = require("../controller/plan_ishrane");
const plan_treninga_controller = require("../controller/plan_treninga");
const vezba_controller = require("../controller/vezba");
const plan_treninga_vezba_controller = require("../controller/plan_treninga_vezba");
const obrok_controller = require("../controller/obrok");
const plan_ishrane_obrok_controller = require("../controller/plan_ishrane_obrok");
const grupa_controller = require("../controller/grupa");
const clan_controller = require("../controller/clan");
const trening_controller = require("../controller/trening");
const clanarina_controller = require("../controller/clanarina");
const upload_controller = require("../controller/uploadPic");
//const { json } = require('sequelize/types');
const plan_ishrane = require("../models/plan_ishrane");
const plan_treninga = require("../models/plan_treninga");
const obrok = require("../models/obrok");
const { func, x } = require("joi");
const { ɵclearResolutionOfComponentResourcesQueue } = require("@angular/core");

router.use(TrenerPrivilegija);

//RADII
router.get("/home-trener/:id_trenera", async (req, res) => {
  const korisnik = await korisnik_controller.getSpecificKorisnik(
    req.params.id_trenera
  ); //korisnicko ime, slika
  const osoba = await osoba_controller.getSpecificOsoba(req.params.id_trenera); //ime, prezime
  const trener = await trener_controller.getSpecificTrener(
    req.params.id_trenera
  ); //grupe, clanovi kojima se on trener

  const grupe = await grupa_controller.getGrupaPoTreneru(req.params.id_trenera); //Termini, Naziv
  console.log(grupe);
  const clanovi = await clan_controller.getSviClanoviTrenera(
    req.params.id_trenera
  ); //GrupaID je ovde
  const niz_id = clanovi.map((x) => x.ID); //niz id ljudi koji su klijenti
  const osobe = await osoba_controller.getViseOsobaPoID(niz_id); // ime i prezime
  const personalni = await clan_controller.getSviPersVezbaceTrenera(
    req.params.id_trenera
  );
  const niz_pers_id = personalni.map((x) => x.ID);
  const treninzi = await trening_controller.getSviTreninziZaClanove(
    niz_pers_id
  );

  let za_slanje = [];

  clanovi.forEach((clan, ind) => {
    const objekat = {
      Ime: osobe[ind].Ime,
      Prezime: osobe[ind].Prezime,
      GrupaID: clan.GrupaID,
      Treninzi: treninzi.filter((t) => t.ClanID === clan.ID),
    };
    za_slanje.push(objekat);
  });

  const obj = {
    imeTrenera: osoba.Ime,
    prezimeTrenera: osoba.Prezime,
    grupe: grupe,
    klijenti: za_slanje,
    //"Imena":pers_osobe
  };

  res.status(200).send(obj);
});
//RADII
router.get("/klijenti/:id_trenera", async (req, res) => {
  //const osoba = await osoba_controller.getSpecificOsoba(req.params.id_trenera); //ime, prezime
  const clanovi = await clan_controller.getSviClanoviTrenera(
    req.params.id_trenera
  );
  const niz_id = clanovi.map((x) => x.ID);
  const osobe = await osoba_controller.getViseOsobaPoID(niz_id);
  const telefoni = await osoba_controller.getViseTelefonaViseOsoba(
    osobe.map((x) => x.ID)
  );
  const grupe = await grupa_controller.getGrupaPoTreneru(req.params.id_trenera); //Termini, Naziv

  let nizIDClanovi = clanovi.filter((c) => c.GrupaID == null);

  let nizIDClanoviTrening = nizIDClanovi.map((c) => c.PlanTrId);

  let nizIDSamostalniIshrana = nizIDClanovi.map((c) => c.PlanIsId);

  let nizIDGrupe = clanovi.filter((c) => c.GrupaID != null);

  let nizIDGrupeTrening = grupe.map((g) => g.PlanTrID);

  console.log("EVOOOOOOO MEEEE " + nizIDGrupeTrening);

  let nizIDGrupeIshrana = nizIDGrupe.map((g) => g.PlanIsId);

  const planoviTreningaSamostalni =
    await plan_treninga_controller.getVisePlanovaTreninga(nizIDClanoviTrening);
  const planoviTreningaGrupe =
    await plan_treninga_controller.getVisePlanovaTreninga(nizIDGrupeTrening);

  const planoviIshraneSamostalni =
    await plan_ishrane_controller.getVisePlanovaIshrane(nizIDSamostalniIshrana);
  const planoviIshraneGrupe =
    await plan_ishrane_controller.getVisePlanovaIshrane(nizIDGrupeIshrana);

  const clanarine = await clanarina_controller.getViseClanarinaPoNizu(niz_id);

  console.log(grupe);

  const niz_za_slanje = [];
  const grupe_slanje = [];

  osobe.forEach((o, ind) => {
    if (clanovi[ind].GrupaID == null) {
      let t = telefoni.find((t) => t.osobaID === o.ID);
      let p = planoviTreningaSamostalni.find(
        (p) => p.ID === clanovi[ind].PlanTrId
      );
      let is = planoviIshraneSamostalni.find(
        (p) => p.ID === clanovi[ind].PlanIsId
      );
      const obj = {
        Ime: o.Ime,
        Prezime: o.Prezime,
        ID: o.ID,
        Telefon: t != null ? t.Telefon : null,
        PlanTreninga: p || null,
        PlanIshrane: is || null,
        TipClanarine: clanarine[ind].Tip,
        Cilj: clanovi[ind].Cilj
      };

      niz_za_slanje.push(obj);
    }
  });

  grupe.forEach((g, ind) => {
    const obj = {
      Termini: g.Termini,
      Naziv: g.Naziv,
      ID: g.ID,
      TrenutniKap: g.TrenutniKap,
      Kapacitet: g.Kapacitet,
      PlanTreninga:
        planoviTreningaGrupe.find((p) => p.ID === g.PlanTrID) || null,
      PlanIshrane: planoviIshraneGrupe.find((p) => p.ID === g.PlanIsId) || null,
    };

    grupe_slanje.push(obj);
  });

  const obj = {
    Osobe: niz_za_slanje,
    Grupe: grupe_slanje,
  };

  res.status(200).json(obj);
});

async function vratiGrupu(req, res, next) {
  await grupa_controller
    .getSpecificGrupa(req.params.id_grupe)
    .then(async (grupa) => {
      await plan_treninga_controller
        .getSpecificPlanTreninga(grupa.PlanTrID)
        .then((plan) => {
          req.body.grupa = grupa;
          req.body.PlanTreninga = plan != null ? plan.Naziv : null;
          req.body.osobe = null;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send();
        });
    });
}

async function vratiClanoveGrupe(req, res, next) {
  await clan_controller
    .getSviClanoviGrupe(req.body.grupa.ID)
    .then((clanovi) => {
      if (clanovi.length != 0) {
        req.body.clanovi = clanovi;
      } else {
        req.body.clanovi = null;
      }
      next();
    });
}

async function vratiOsobeGrupe(req, res, next) {
  if (req.body.clanovi == null) next();
  else {
    await osoba_controller
      .getViseOsobaPoID(req.body.clanovi.map((x) => x.ID))
      .then((osobe) => {
        req.body.osobe = osobe;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  }
}

router.get(
  "/klijenti/grupa/:id_grupe",
  vratiGrupu,
  vratiClanoveGrupe,
  vratiOsobeGrupe,
  async (req, res) => {
    console.log("EVOOOOO MEEE");
    console.log(req.params.id_grupe);

    const obj = {
      grupa: req.body.grupa,
      osobe: req.body.osobe,
      NazivPlanaTreninga: req.body.PlanTreninga,
    };

    res.status(200).json(obj);
  }
);

router.get("/klijenti/personalni/:id_clana", async (req, res) => {
  const osoba = await osoba_controller.getSpecificOsoba(req.params.id_clana);
  const clan = await clan_controller.getSpecificClan(req.params.id_clana);

  const plan_ishrane = await plan_ishrane_controller.getSpecificPlanIshrane(
    clan.PlanIsId
  ); //Naziv,Tip
  const niz_obroka = await plan_ishrane_obrok_controller.getSviObrociZaPlan(
    plan_ishrane.ID
  );
  const niz_id = niz_obroka.map((o) => o.ObrokID);
  const obroci = await obrok_controller.getViseObrokaNiz(niz_id);

  const plan_treninga = await plan_treninga_controller.getSpecificPlanTreninga(
    clan.PlanTrId
  );
  const lista_vezbi = await plan_treninga_vezba_controller.getSveVezbeZaPlan(
    plan_treninga.ID
  );
  const niz_id_vezbi = lista_vezbi.map((x) => x.VezbaID);
  const nazivi_vezbi = await vezba_controller.getViseVezbiPoPlanu(niz_id_vezbi);

  const obj = {
    Ime: osoba.Ime,
    Prezime: osoba.Prezime,
    Cilj: clan.Cilj,
    PlanIshrane: plan_ishrane,
    Obroci: obroci,
    PlanTreninga: plan_treninga,
    OpisVezbi: lista_vezbi,
    Vezbe: nazivi_vezbi,
  };

  res.status(200).json(obj);
});

router.get("/sve-vezbe", async (req, res) => {
  await vezba_controller
    .getSveVezbe()
    .then((listaVezbi) => {
      res.status(200).send(listaVezbi);
    })
    .catch((err) => {
      res.status(400).send();
    });
});

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

router.post("/vezbe/dodaj", async (req, res) => {
  {
    const nova_vezba = req.body;
    await vezba_controller
      .createVezba(nova_vezba)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => {
        res.status(500).send();
      });
  }
});

router.get("/planovi/ishrana/:idTrenera", async (req, res) => {
  await plan_ishrane_controller
    .getPlanoviIshranePoTreneru(req.params.idTrenera)
    .then((planovi) => {
      res.status(200).send(planovi);
    })
    .catch(() => res.status(500).send());
  /* const niz_id_planova = planovi.map(p=>p.ID);
    const obroci_planova = await plan_ishrane_obrok_controller.getObrokeZaVisePlanova(niz_id_planova);*/

  //const obroci = await plan_ishrane_obrok_controller.getSviObrociZaPlan()
});

router.get("/planovi/ishrana/plan/:idPlana", async (req, res) => {
  await plan_ishrane_obrok_controller
    .getSviObrociZaPlan(req.params.idPlana)
    .then((obroci) => {
      res.status(200).send(obroci);
    })
    .catch(() => res.status(500).send());
});
//await plan_ishrane_controller.getPlanoviIshranePoTreneru(req.params.id_trenera).then((planoviIshrane)=>{

/*let obj_za_slanje= [];
planoviIshrane.forEach(
    async function u_petlji(plan){
        await plan_ishrane_obrok_controller.getSviObrociZaPlan(plan.ID).then((obroci_plana)=>{
            const obj = {
                "nazivPlana":plan.Naziv,
                "tipPlana":plan.Tip,
                "obrociPlana":obroci_plana
            }
            obj_za_slanje.push(obj);
        });
        

       
    })

    res.status(200).send(obj_za_slanje);
    }); //naziv, tip*/

router.get("/planovi/trening/:id_trenera", async (req, res) => {
  const planovi_treninga =
    await plan_treninga_controller.getPlanoviTreningaPoTreneru(
      req.params.id_trenera
    ); //naziv, nivo, trajanje
  res.status(200).send(planovi_treninga);

  /* 

    //res.status(200).send(obj_za_slanje);*/
});

router.get("/planovi/trening/vezbe/:idPlana", async (req, res) => {
  let obj_za_slanje;

  const vezbe_plana_medju =
    await plan_treninga_vezba_controller.getSveVezbeZaPlan(req.params.idPlana);
  const niz_id_vezbi = vezbe_plana_medju.map((p) => p.VezbaID);
  const vezbe = await vezba_controller.getViseVezbiPoPlanu(niz_id_vezbi);
  const vezbe_nazivi = vezbe.map((v) => v.Naziv);
  const brSerijaZaSveVezbe = vezbe_plana_medju.map((vpm) => vpm.BrSerija);
  const brPonavljanja = vezbe_plana_medju.map((vpm) => vpm.BrPonavljanja);
  const brSekundi = vezbe_plana_medju.map((vpm) => vpm.BrSekundi);
  const dani = vezbe_plana_medju.map((vpm) => vpm.Dani);
  const rBrVezbe = vezbe_plana_medju.map((vpm) => vpm.RBrVezbe);

  const obj = {
    //"nazivPlanaTreninga" : pt.Naziv,
    //"nivoPlanaTreninga" : pt.Nivo,
    //"trajanjePlana": pt.Trajanje,
    naziviVezbiPlana: vezbe_nazivi,
    brSerijaZaSveVezbe: brSerijaZaSveVezbe,
    brPonavljanja: brPonavljanja,
    brSekundi: brSekundi,
    dani: dani,
    rBrVezbe: rBrVezbe,
  };

  //obj_za_slanje.push(obj);

  //planovi_treninga.forEach(u_petlji);
  res.status(200).send(obj);
});

//POST PLAN TRENINGA
//POST PLAN ISHRANE

router.post("/planovi/ishrana/kreiraj-obrok", async (req, res) => {
  const novi_obrok = req.body;
  await obrok_controller
    .createObrok(novi_obrok)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.send(400);
    });
});

router.post("/planovi/ishrana/kreiraj-plan", async (req, res) => {
  const novi_plan = req.body; //tip, naziv, trener_id,  niz id obroka
  const PlanIshrane = req.body.PlanIshrane;
  const Obroci = req.body.Obroci;
  await plan_ishrane_controller
    .createPlanIshrane(PlanIshrane)
    .then(async (plan) => {
      Obroci.forEach(async (obrok) => {
        const obj = {
          Naziv: obrok.Naziv,
          Tip: obrok.Tip,
          Dan: obrok.Dan,
          NacinPripreme: obrok.NacinPripreme,
          VrstaObroka: obrok.VrstaObroka,
          Sastojci: obrok.Sastojci,
        };
        await obrok_controller
          .createObrok(obj)
          .then(async (ob) => {
            const objek = {
              PlanIsID: plan.ID,
              ObrokID: ob.ID,
            };
            await plan_ishrane_obrok_controller
              .createPlanIshraneObrok(objek)
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

      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.post("/planovi/trening/kreiraj-plan", async (req, res) => {
  //trener_id, naziv, nivo, trajanje, niz_id_vezbi za plan, niz_brSerija, niz_brPonavljanja, nizBrSekundi, nizDana, nizRBrVezbe

  const planTreninga = req.body.PlanTreninga;
  const Vezbe = req.body.Vezbe;

  console.log(Vezbe);

  await plan_treninga_controller
    .createPlanTreninga(planTreninga)
    .then(async (plan) => {
      Vezbe.forEach(async (vezba) => {
        const obj = {
          PlanTrID: plan.ID,
          VezbaID: vezba.ID,
          BrSerija: vezba.BrSerija,
          BrPonavljanja: vezba.BrPonavljanja,
          Dani: vezba.Dani,
          RBrVezbe: 0,
        };

        await plan_treninga_vezba_controller
          .createPlanTreningaVezba(obj)
          .catch((err) => {
            console.log(err);
            res.status(500).send();
          });
      });

      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.delete("/planovi/trening/obrisi-plan/:id", async (req, res) => {
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

router.delete("/planovi/ishrana/obrisi-plan/:id", async (req, res) => {

  let niz_obroka_za_brisanje = await plan_ishrane_obrok_controller.getSviObrociZaPlan(req.params.id);

  niz_obroka_za_brisanje = niz_obroka_za_brisanje.map(x=>x.ID);

  console.log(niz_obroka_za_brisanje);

  await plan_ishrane_controller
    .deletePlanIshrane(req.params.id, niz_obroka_za_brisanje)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
});

router.get("/podesavanja/:id_trenera", async (req, res) => {
  const trener_korisnik = await korisnik_controller.getSpecificKorisnik(
    req.params.id_trenera
  ); //username, slika, email
  const trener = await trener_controller.getSpecificTrener(
    req.params.id_trenera
  );
  const osoba_trener = await osoba_controller.getSpecificOsoba(
    req.params.id_trenera
  );

  const obj = {
    korisnik: trener_korisnik,
    osoba: osoba_trener,
    trener: trener,
  };

  res.status(200).send(obj);
});

//PUT IZMENE U PODESAVANJIMA

router.put("/sacuvaj-podesavanja", async (req, res) => {
  console.log(req.body);
  await trener_controller
    .updatePodesavanjaTrener(req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.get(
  "/vrati-obroke-po-vrsti-tipu/:tipObroka/:vrstaObroka",
  async (req, res) => {
    console.log(req.params.tipObroka, req.params.vrstaObroka);
    await obrok_controller
      .getSviObrociPoVrstiTipu(req.params.tipObroka, req.params.vrstaObroka)
      .then((lista) => {
        res.status(200).send(lista);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  }
);

router.get("/prijavi-problem/:id_trenera", async (req, res) => {
  //osoba ime prezime
  //korisnik email

  const osoba = await osoba_controller
    .getSpecificOsoba(req.params.id_trenera)
    .catch(() => {
      res.status(500).send("Unable to get osoba");
    });

  const korisnik = await korisnik_controller
    .getSpecificKorisnik(req.params.id_trenera)
    .catch(() => {
      res.status(500).send("Unable to get korisnik");
    });

  const obj = {
    ime: osoba.Ime,
    prezime: osoba.Prezime,
    korisnik: korisnik,
  };

  res.status(200).send(obj);
});

router.put("/dodaj-u-grupu", async (req, res) => {
  await clan_controller
    .updateClanGrupa(req.body.GrupaID, req.body.ClanID)
    .then(async () => {
      await grupa_controller
        .getSpecificGrupa(req.body.GrupaID)
        .then(async (grupa) => {
          await clan_controller
            .updateClanPlanTr(grupa.PlanTrID, req.body.ClanID)
            .then(async () => {
              await clan_controller
                .updateClanPlanIs(grupa.PlanIsId, req.body.ClanID)
                .then(async () => {
                  await grupa_controller
                    .updateTrenutniKapGrupe(
                      req.body.GrupaID,
                      grupa.TrenutniKap + 1
                    )
                    .then(async () => {
                      await clanarina_controller
                        .updateClanarinaTip("Grupni", req.body.ClanID)
                        .then(() => {
                          res.status(200).send();
                        });
                    })
                    .catch((err) => {
                      console.log("ZAJEEEB KOD UPDATE GRUPE KAP" + err);
                      res.status(500).send();
                    });
                })
                .catch((err) => {
                  console.log("ZAAAJEB KOD PLAN ISHRANE" + err);
                  res.status(500).send();
                });
            })
            .catch((err) => {
              console.log("ZAAAJEB KOD PLAN TRENIGA" + err);
              res.status(500).send();
            });
        })
        .catch((err) => {
          console.log("ZAAAJEB KOD FETCH GRUPE" + err);
          res.status(500).send();
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.put("/izbaci-iz-grupe", async (req, res) => {
  await clan_controller.getSpecificClan(req.body.ClanID).then(async (clan) => {
    await grupa_controller
      .getSpecificGrupa(clan.GrupaID)
      .then(async (grupa) => {
        await clan_controller
          .updateClanGrupa(null, req.body.ClanID)
          .then(async () => {
            await clan_controller
              .updateClanPlanTr(null, req.body.ClanID)
              .then(async () => {
                await clan_controller
                  .updateClanPlanIs(null, req.body.ClanID)
                  .then(async () => {
                    await grupa_controller
                      .updateTrenutniKapGrupe(grupa.ID, grupa.TrenutniKap - 1)
                      .then(async () => {
                        res.status(200).send();
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
      });
  });
});

router.post("/prijavi-problem/posalji-mail", async (req, res) => {
  let mailAdresa = req.body.emailAdresa;
  let pass = req.body.lozinka;

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

router.put("/dodeli-plan-treninga", async (req, res) => {
  if (req.body.grupaID != -1) {
    //grupi dodeljuyjes

    await grupa_controller
      .updateGrupaPlanTr(req.body.planID, req.body.grupaID)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  } else {
    await clan_controller
      .updateClanPlanTr(req.body.planID, req.body.clanID)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  }

  // console.log('Neka druga greska');
  // res.status(500).send();
});

router.put("/dodeli-plan-ishrane", async (req, res) => {
  if (req.body.grupaID != -1) {
    await grupa_controller
      .updateGrupaPlanIshrane(req.body.planID, req.body.grupaID)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  } else {
    await clan_controller
      .updateClanPlanIs(req.body.planID, req.body.clanID)
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  }
});

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
  console.log(
    "D:\\_Faks\\Semestar 6\\SWE\\Projekat\\si.21.05.gymhub\\Aplikacija\\App\\API\\public\\" +
      korisnik.Slika
  );
  // let putanja = __dirname;
  // putanja = putanja.replace("routes","public");
  const ovoRadi =
    "D:\\_Faks\\Semestar 6\\SWE\\Projekat\\si.21.05.gymhub\\Aplikacija\\App\\API\\public\\";
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

function TrenerPrivilegija(req, res, next) {
  if (req.headers["tip"] == "C") res.status(401).send();
  else next();
}

module.exports = router;
