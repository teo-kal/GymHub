require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = function (req,res,next) {
    console.log('U autentikaciji sam');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Izvukoh token, evo ga:')
    if(token == null)
        return res.status(401); //access denied

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payloadKorisnik)=>{
        if(err)
            return res.status(403);
        
        //auth uspesan
        next();
    })
}