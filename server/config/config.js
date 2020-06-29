//Configuración Global

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// PORT
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
process.env.PORT = process.env.PORT || 3000;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ENTORNO
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// BASE DE DATOS
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cotizador';
}else{
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Vencimiento del Token
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// SEED de autenticacion
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
process.env.SEED = process.env.SEED || 'este-es-el-seed-dev';


