let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');


let Friend = require('../models/friends');
let friendController = require('../controller/friend');
/* CRUD Operation*/

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



router.get('/',friendController.displayFriendList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add',requireAuth, friendController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add',requireAuth, friendController.processAddPage);
/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',requireAuth,friendController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',requireAuth, friendController.processEditPage);
/* Delete Operation */
/* Get to perform Delete Operation -- Deletion */
router.get('/delete/:id',requireAuth,friendController.performDelete);


module.exports=router;