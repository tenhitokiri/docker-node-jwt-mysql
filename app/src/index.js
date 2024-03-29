const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mySqlStore = require('express-mysql-session');
const axios = require('axios');
const fetch = require('node-fetch');

const passport = require('passport');
const verify = require('./modules/auth/verify');

//activar modo desarrollo
const modo = process.env.PORT;
if (!modo) {
	const dotenv = require('dotenv').config();
	console.log('modo dev');
}

const {
	database
} = require('./keys');

const app = express();

//Configuración de la aplicación

//Middleware
app.use(express.json());
// Express Session
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
		store: new mySqlStore(database)
	})
);

/* app.use(async (req, resp, next) => {
    //console.log('Time:', Date.now());
    //resp.set('X-XSS-Protection', "0");
   //console.log("headers : ", JSON.stringify(req.headers));
    const f_response = await fetch(`https://jsonplaceholder.typicode.com/posts`); 
    // const f_response = await fetch(`http://localhost:3000/api/auth/verify`);
    console.log("Resp", f_response.Headers);  
    //req.header('Access-Control-Expose-Headers');
    //req.body = {json:"auth"}; 
  next();
}) */

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

//Asi si sirve
app.use('/server', async (req, res) => {
	let salida = '';
	const roles = await axios
		//.get('http://127.0.0.1/api/roles')
		.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
		.then((response) => {
			//console.log(response.data.url);
			//console.log(response.data.explanation);
			//res.json(response);
			salida = response;
		})
		.catch((error) => {
			console.log(error);
		});
	console.log(salida.data);
	res.send(salida.data);
});

//así no sirve
app.get('/server2', async (req, res) => {
	let salida = '';
	//const roles = await fetch('http://127.0.0.1/api/roles')
	const roles = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
		.then((response) => {
			console.log(response);
			salida = response;
		})
		.catch((err) => console.log(err));
	console.log(salida);
	//res.json(roles);
	res.send(salida);
});

//404 handle
app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});

module.exports = app;