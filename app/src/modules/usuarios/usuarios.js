const router = require('express').Router();
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const verify = require('../auth/verify')
const secret_key = process.env.SECRET_KEY


const bcript = require('bcryptjs');

router.get('/', verify, (req, res) => {
    console.log(secret_key)
    res.json({
        message: "Inicio de autenticacion"
    })
})


module.exports = router;