const express = require("express");
const app = express();
const multer = require("multer");
const productosRouter = express.Router();
var session = require('express-session');

module.exports = productosRouter;

const Contenedor = require('./classProductos.js');
const path = require('path')
const fileName = path.resolve(__dirname,'productos.txt');
let productos = new Contenedor(fileName);

//middleware para validar que en el header venga como admin
function adminMid(req, res, next){
    if(req.headers.admin){
        next();    
    }
    else{
        res.status(401).send('Necesitas ser admin');
    }
}; 

productosRouter.get('/',  async (req, res) => {
    let array = await productos.getAll();
    res.send(array);
});

productosRouter.get('/:id', async (req, res) => {
    let producto=await productos.getById(req.params.id);
    res.send(producto);
});

productosRouter.post('/', adminMid, async (req, res) => {
        let producto = JSON.stringify(req.body);
        let productoSave=await productos.save(producto);
        res.status(200).send(productoSave);
});

productosRouter.put('/:id', adminMid, async (req, res) => {
    
    let producto=await productos.putById(req.params.id,req.body);
    res.send(producto);
});

productosRouter.delete('/:id', adminMid, async (req, res) => { 
    res.sendStatus(await productos.deleteById(req.params.id));
})