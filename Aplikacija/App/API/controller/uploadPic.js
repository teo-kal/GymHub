
const multer = require('multer');

// const sequelize = require('../sequelize');
// const {Sequelize} = require('sequelize');
// const korisnik = require('../models/korisnik')(sequelize,Sequelize);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../src/assets/Avatars')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
})

uploadAvatar = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileError = 'File format is not valid';
        }
    }
 })

