//const express = require('express')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({
        err: 'Acceso denegado, No existe el Token de autentificacion'
    });

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
}

module.exports = auth;