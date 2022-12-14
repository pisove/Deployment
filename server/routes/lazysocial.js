let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect with lazysocial model

let lazysocial = require('../models/lazysocial');
let lazysocialController = require('../controller/lazysocial');

/*show lazysocial page*/
router.get('/', lazysocialController.displayLazysocial);

/*show add item page*/
router.get('/add', lazysocialController.displayAddPage);

/*add item operation*/
router.post('/add', lazysocialController.processAddPage);

/*show edit item page*/
router.get('/edit/:id', lazysocialController.displayEditPage);

/*update item operation*/
router.post('/edit/:id', lazysocialController.processEditPage);

/*show delete confirmation*/
router.get('/delete/:id', lazysocialController.displayDeletePage)

/*delete item operation*/
router.post('/delete/:id', lazysocialController.performDelete);

module.exports = router;

