const express = require("express");
const app = express();
const multer = require("multer");
const carritoRouter = express.Router();

module.exports = carritoRouter;

const Contenedor = require('./classCarrito.js');
const path = require('path')
const fileName = path.resolve(__dirname,'carritos.txt');
let carritos = new Contenedor(fileName);

/*carritoRouter.post('/', async (req, res) => {
    console.log(req.body);
    let carrito=await carritos.crearCarrito(req.body);
    res.send(carrito);
});*/


carritoRouter.post('/', async (req, res) => {
    let carrito=await carritos.crearCarrito(req.body);
    res.send(carrito);
});

carritoRouter.get('/:id/productos', async (req, res) => {
    console.log(req.params); 
    let carrito=await carritos.getById(req.params.id);
    res.send(JSON.parse(carrito));
});

carritoRouter.delete('/:id', async (req, res) => { 
    res.sendStatus(await carritos.deleteById(req.params.id));
});

carritoRouter.post('/:id/productos', async (req, res) => {
    let carrito = JSON.stringify(req.body);
    let carritoSave=await carritos.postById(req.params.id,carrito);
    res.status(200).send(carritoSave);
});

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) =>{
    res.sendStatus(await carritos.deleteById(req.params.id, req.params.id_prod));
});