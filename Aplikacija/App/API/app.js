const sequelize = require('./sequelize');
const express = require('express');
const PORT = 3000;
const cors = require('cors');
const adminRouter = require('./routes/admin');
const clanRouter = require('./routes/clan');
const trenerRouter = require('./routes/trener');
const authRouter = require('./routes/authRoute');
const placanjeRouter = require("./routes/placanjeRoute");
const cron = require('node-cron');
const cronjob_controller = require("./controller/cron-job");
const bodyParser = require('body-parser');
const authMiddleware = require('./auth.js');
const helmet = require('helmet');
const { scheduled } = require('rxjs');
//const jsonParser = bodyParser.jsonParser();

//rootRouter.use('/izmeni-nalog', authRoute);
const app = express();
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
const rootRouter = express.Router();
const corsOptions = {
    origin:'http://localhost:4200'
}
rootRouter.use('/nalog',authRouter);
rootRouter.use('/plati',placanjeRouter);
rootRouter.use(authMiddleware);
rootRouter.use('/admin', adminRouter);
rootRouter.use('/clan', clanRouter);
rootRouter.use('/trener',trenerRouter);

//rootRouter.use('/login',authRouter);
//rootRouter.use('/register',authRouter);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'))

app.use('/', rootRouter);



sequelize.sync({force: false}).then(message => {
    console.log('...and database is synced!')
})


app.listen(PORT, ()=>{
    console.log("Server listening on port 3000...")
})

cron.schedule('* 00 23 * 7',cronjob_controller.obrisiSveTreninge,{scheduled:false});



