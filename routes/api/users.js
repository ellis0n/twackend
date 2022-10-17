const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/users.json')

router.route('/')
    .get((req,res)=>{
        res.json(data.employees);
    })
    .post((req,res)=>{
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastname
        })
    })
    .put((req,res)=>{
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastname
        })
    })
    .delete((req,res)=>{
        res.json({"id": req.body.id})
    });

router.route('/:id')
    .get((req,res)=>{
        res.json({"id": req.params.id})
    })

module.exports = router;