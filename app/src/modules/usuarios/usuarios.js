const router = require('express').Router();
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const verify = require('../auth/verify')
const secret_key = process.env.SECRET_KEY
const pool = require('../../database')
const bcript = require('bcryptjs');

router.get('/', verify, async (req, res) => {
    const users = await pool.query('call balance_comprobacion("2020-01-01", "2020-04-30") ');
    res.json(users)
})

module.exports = router;