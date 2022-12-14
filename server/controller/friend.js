let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with Friend model
let Friend = require('../models/friends');
/* CRUD Operation*/

module.exports.displayFriendList = (req,res,next)=>{
    Friend.find((err, friendlist)=>{
        if (err) {
            return console.error(err); 
        }
        else {
            res.render('friends/list',{
                title:'Friends', 
                Friendlist: friendlist,
                displayName: req.user ? req.user.displayName:''  
            }) 
        }
    });
}

module.exports.displayAddPage = (req,res,next)=> {
    res.render('friends/add',{
        title:'Add Friend',
        displayName: req.user ? req.user.displayName:''  
    })
}

module.exports.processAddPage = (req,res,next)=> {
    let newFriend = Friend ({
        "name":req.body.name,
        "userName":req.body.userName,
        "description": req.body.description,
        "email":req.body.email,
        "number":req.body.number
    });
    Friend.create(newFriend,(err,Friend) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/friend-list');
     }
    })
 
 }

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Friend.findById(id, (err, friendToEdit) =>{
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('friends/edit',{
                title:'Edit Friend', 
                friend:friendToEdit,
                displayName: req.user ? req.user.displayName:''
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateFriend = Friend({
        "_id": id,
        "name": req.body.name,
        "userName": req.body.userName,
        "description": req.body.description,
        "email": req.body.email,
        "number": req.body.number
    });
    Friend.updateOne({_id: id},updateFriend, (err) =>{
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/friend-list');
        }
    });
}

module.exports.displayDeletePage = (req, res, next) => {
    let id = req.params.id;
    Friend.findById(id, (err, friendToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('friend-list/delete', { title: 'Delete Item', item: friendToEdit });
        }
    });
}

module.exports.performDelete = (req,res,next)=> {
    let id =req.params.id;
    Friend.deleteOne({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/friend-list');
        }
    });
}