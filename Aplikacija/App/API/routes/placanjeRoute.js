const express = require("express");
const app = express();
const router = express.Router();
const clanarina_controller = require("../controller/clanarina");


app.use("/plati", router);

router.get("/:id", async(req,res)=>{
  await clanarina_controller.getClanarinaZaClana(req.params.id).then((clanarina)=>{
        const obj = {
          TipClanarine:clanarina.Tip
        }
        res.status(200).send(obj);
  }).catch((err)=>{
      console.log(err);
      res.status(500).send();
  })
})

router.put("/", async(req,res)=>{

  console.log(req.body);
    await clanarina_controller.updateClanarinaDatumPosPlacanja(req.body.ClanID).then(async()=>{
          await clanarina_controller.updateClanarinaPeriod(req.body.Period,req.body.ClanID).then(async()=>{
                await clanarina_controller.updateClanarinaTip(req.body.Tip,req.body.ClanID).then(()=>{
                        res.status(200).send();
                })
            
          })
    }).catch((err)=>{
      console.log(err);
      res.status(500).send();
    })
  })

  module.exports = router;