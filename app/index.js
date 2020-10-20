const app = require('./src/index');
port = process.env.PORT

//conexión asincrona para levantar el servidor
async function main() {
    await app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor Ejecutandose en el puerto ${port}, er mio`);
    });
}

main();