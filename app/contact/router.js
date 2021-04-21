// (1) import router dari express
const router = require('express').Router();
// (2) import product controller 
const contactController = require('./controller'); 
// (3) pasangkan route endpoint dengan method `store`
router.post('/contacts', contactController.store);
// (4) export router 
module.exports = router;