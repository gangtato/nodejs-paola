// (1) import multer
const multer = require("multer");
// (1) import os dari express
const os = require("os");
// (1) import router dari express
const router = require('express').Router();
// (2) import product controller 
const contactController = require('./controller'); 
// (3) pasangkan route endpoint dengan method `store`
router.post('/contacts', multer({dest: os.tmpdir()}).single('picture'), contactController.store);
// (4) get route contacts
router.get('/contacts', contactController.index);
// (5) put route contacts
router.put('/contacts/:id', multer({dest: os.tmpdir()}).single('picture'), contactController.update);
// (6) export router 
module.exports = router;