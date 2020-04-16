const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY

const emailValidator = require('email-validator');
const bcript = require('bcryptjs');

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: "thk",
        email: "tenhitokiri@gmail.com"
    }
    console.log(secret_key)
    jwt.sign({
        user
    }, secret_key, (err, token) => {
        res.json({
            token
        })
    })
})

router.post('/register', (req, res) => {
    res.json({
        message: "area de registro"
    })
})
module.exports = router;