const express = require('express');
const jwt = require('jsonwebtoken')

const app = express()

app.get('/', (req, res) => {
    res.json({
        message: "La Api está en /api"
    })
})