const jwt = require('jsonwebtoken');
//===============================================
// Validar Token
//===============================================
let verificarToken = (req, res, next) => {
    let token = req.get('token');

    console.log(token);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

//===============================================
// Validar Role
//===============================================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El Usuario no es Administrador'
            }
        });
    }
};


module.exports = {
    verificarToken,
    verificaAdmin_Role
}