const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificarToken, verificaAdmin_Role } = require('../middlewares/authentication');
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/usuario', verificarToken, (req, res) => {

    res.header('Access-Control-Allow-Origin', '*');

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // })

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 1;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });
        })

})

app.post('/usuario', [verificarToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

app.put('/usuario/:id', [verificarToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // delete body.password;
    // delete body.role;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


})

app.delete('/usuario/:id', [verificarToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    });
})

module.exports = app;