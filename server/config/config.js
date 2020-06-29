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
    urlDB = 'mongodb+srv://valens:jiosUodSz9nNjMHJ@cluster0-3mnvi.mongodb.net/cotizador';
}
process.env.URLDB = urlDB;


