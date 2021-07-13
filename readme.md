# Proyecto de Prueba de CI/CD, Docker, Gitlab Runner

## Descrición

Rest API de pruebas de Integración y despliegue continuo en contenedor Docker usando Nodejs, jwt.

## Creado por:

Chrsitian Mejia

## Fecha:

06 Agosto 2020

## Tecnologías usadas:

- Nodejs
- Express
- jwt
- docker
- gitlab ci

### Enpoints

- /
- /api
- /server
- /server2
- /api/users [GET] (jwt)
- /api/auth/login [POST] (jwt)
- /api/auth/verify [POST] (jwt)
- /api/auth/register [POST] (jwt)

### Envs

- PORT
- SECRET_KEY
- MYSQL_SERVER
- MYSQL_USER
- MYSQL_PW
- MYSQL_DB
- MYSQL_PORT
