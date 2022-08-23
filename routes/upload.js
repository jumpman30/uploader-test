var express = require('express');
var router = express.Router();
const multer  = require('multer');

const fileStorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        console.log(req.query.filename);
        cb(null, req.query.filename + file.originalname)
},
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }
})

const upload = multer({ storage: fileStorageEngine});

router.post('/', (req, res, next) => {
    req.query.filename = Date.now();
    next();
} ,upload.single('file'), (req, res) => {

    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

module.exports = router;