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
    jwt.sign({
        user
    }, secret_key, (err, token) => {
        res.json({
            token
        })
    })
})

router.post('/verify', (req, res) => {
    const token = req.header('auth-token');
     try {
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified;
        next();
    } catch (err) {
        const error = `Token invalido: ${process.env.SECRET_KEY}`;
        res.status(400).json({
            err: error
        })
    }
})

router.post('/register', (req, res) => {

    res.json({
        message: "area de registro"
    })
})

module.exports = router;