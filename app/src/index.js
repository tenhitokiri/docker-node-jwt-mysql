const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mySqlStore = require('express-mysql-session');
const fetch = require('node-fetch');

const passport = require('passport');
const verify = require('./modules/auth/verify');

//activar modo desarrollo
const modo = process.env.PORT;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

const { database } = require('./keys');

const app = express();

//Configuración de la aplicación

//Middleware
app.use(express.json());
// Express Session
app.use(
	session({
		secret            : process.env.SECRET_KEY,
		resave            : false,
		saveUninitialized : false,
		store             : new mySqlStore(database)
	})
);

//RUTAS
app.get('/', (req, res) => {
	const message = `La api esta en /API. la clave secreta es ${process.env.SECRET_KEY}`;
	res.json({
		message
	});
});

//Ruta de autenticación
const rutaUsuarios = require('./modules/usuarios/usuarios');
app.use('/api/users', rutaUsuarios);

//Ruta de Registro
const rutaAuth = require('./modules/auth/auth');
app.use('/api/auth', rutaAuth);

app.use('/server', async (req, res) => {
	//const roles = await fetch('http://10.10.0.2/api/roles');
	const roles = await fetch('https://jsonplaceholder.typicode.com/posts');
	console.log(roles);
	//res.json(roles);
	res.send(roles);
});

//404 handle
app.use((req, res, next) => {
	res.status(404).json({
		err : 'Error, Ruta no encontrada'
	});
	next();
});

module.exports = app;
